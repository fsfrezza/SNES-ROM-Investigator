'use strict';
const fs=require('node:fs'),path=require('node:path');
require('./build-profile');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
let html=read('src/index.html');
html=html.replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('src/style.css')+'</style>');
for(const name of ['core','profile','app']){const source=read('src/'+name+'.js');if(source.includes('</script'))throw Error('Unsafe script closing tag in '+name);html=html.replace('<script src="'+name+'.js"></script>',()=>'<script>\n'+source+'\n</script>');}
fs.mkdirSync(path.join(root,'portable'),{recursive:true});fs.writeFileSync(path.join(root,'portable/SNES-ROM-Investigator.html'),html);
console.log('Portable generated: '+Buffer.byteLength(html)+' bytes');
