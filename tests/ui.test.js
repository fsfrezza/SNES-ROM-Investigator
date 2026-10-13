'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true}),page=await browser.newPage({viewport:{width:1440,height:1000},acceptDownloads:true});
 const errors=[],requests=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url());});page.on('dialog',d=>d.accept());
 const root=path.resolve(__dirname,'..'),out=path.join(root,'.test-output');await fs.mkdir(out,{recursive:true});
 const expectNotice=async text=>{await page.locator('#notice').filter({hasText:text}).waitFor();};
 const clickTab=async id=>{await page.locator(`nav button[data-page="${id}"]`).click();};
 const download=async(id,name)=>{const [d]=await Promise.all([page.waitForEvent('download'),page.locator('#'+id).click()]);const file=path.join(out,name);await d.saveAs(file);return fs.readFile(file);};
 await page.goto('file://'+path.join(root,'portable/SNES-ROM-Investigator.html'));
 assert.equal(await page.locator('#save-project').isDisabled(),true);
 await page.locator('#demo').click();await expectNotice('Demonstração sintética');
 const baseline=await download('export-rom','demo-base.sfc');
 await clickTab('tiles');assert.equal(await page.locator('#tile-sheet').getAttribute('width'),'128');
 await page.locator('#pixel-editor').click({position:{x:10,y:10}});assert.match(await page.locator('#edit-count').innerText(),/[1-9]/);
 await page.locator('#undo').click();assert.match(await page.locator('#edit-count').innerText(),/^0 bytes/);
 await clickTab('hex');await page.locator('#edit-offset').fill('009200');await page.locator('#edit-bytes').fill('41 42 43');await page.locator('#apply-edit').click();await expectNotice('3 bytes aplicados');
 assert.match(await page.locator('#edit-count').innerText(),/^3 bytes/);
 await page.locator('#search-term').fill('41 42 43');await page.locator('#search-go').click();await expectNotice('Busca concluída');assert.match(await page.locator('#search-results').innerText(),/009200/);
 const project=await download('save-project','demo.snesproj');assert.equal(JSON.parse(project).edits.length,3);
 await page.locator('#undo').click();assert.match(await page.locator('#edit-count').innerText(),/^0 bytes/);
 await page.locator('#project-file').setInputFiles({name:'demo.snesproj',mimeType:'application/json',buffer:project});await expectNotice('Projeto validado');assert.match(await page.locator('#edit-count').innerText(),/^3 bytes/);
 const edited=await download('export-rom','demo-edited.sfc');assert.deepEqual([...edited.subarray(0x9200,0x9203)],[65,66,67]);assert.equal(edited.length,baseline.length);
 await clickTab('compare');await page.locator('#compare-file').setInputFiles({name:'demo.sfc',mimeType:'application/octet-stream',buffer:baseline});await expectNotice('Comparação concluída');assert.match(await page.locator('#compare-results').innerText(),/^0 bytes diferentes/); // compare uses base, not edits
 const ips=await download('export-ips','edits.ips');assert.equal(ips.subarray(0,5).toString(),'PATCH');
 await clickTab('palettes');await page.locator('#palette-index').fill('0');await page.locator('#palette-color').fill('#ff0000');await page.locator('#palette-edit').click();await expectNotice('Cor convertida');
 await clickTab('audio');await page.locator('#audio-go').click();await expectNotice('BRR decodificada');const wav=await download('export-wav','demo.wav');assert.equal(wav.subarray(0,4).toString(),'RIFF');
 await clickTab('code');await page.locator('#code-go').click();assert.match(await page.locator('#code-table').innerText(),/XCE/);
 await clickTab('symbols');assert.match(await page.locator('#symbols-info').innerText(),/119/);await page.locator('#symbol-filter').fill('Player1Score');assert.match(await page.locator('#symbols-table').innerText(),/000DA2/);
 await clickTab('notes');await page.locator('#note-offset').fill('009200');await page.locator('#note-label').fill('<img src=x onerror=alert(1)>');await page.locator('#note-text').fill('Teste literal, sem executar HTML.');await page.locator('#note-add').click();assert.equal(await page.locator('#notes-list img').count(),0);assert.match(await page.locator('#notes-list').innerText(),/<img/);
 await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
 await page.setViewportSize({width:390,height:844});await clickTab('overview');await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));
 if(process.env.SRI_TEST_ROM){await page.locator('#rom-file').setInputFiles(process.env.SRI_TEST_ROM);await expectNotice('ROM aberta');assert.match(await page.locator('#rom-meta').innerText(),/LoROM/);await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(out,'real-rom.png'),fullPage:true});const output=await download('export-rom','real-roundtrip.sfc'),input=await fs.readFile(process.env.SRI_TEST_ROM);assert.deepEqual(output,input);await clickTab('hex');await page.locator('#hex-offset').fill('007FC0');await page.locator('#hex-go').click();assert.match(await page.locator('#hex-table').innerText(),/SNESFOREVER/);await clickTab('code');await page.locator('#code-reset').click();assert.match(await page.locator('#code-table').innerText(),/007F90/);}
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 console.log('UI passed: demo, editing, undo, project, search, PNG canvas, palette, BRR, disassembly, symbols, safe notes, mobile, no network'+(process.env.SRI_TEST_ROM?', real ROM byte-identical export':''));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
