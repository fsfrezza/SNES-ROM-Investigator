'use strict';
const fs=require('node:fs'),path=require('node:path'),C=require('../src/core');
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(path.join(root,'profiles/iss-deluxe-usa-ram.asm'),'utf8'),imported=C.importSymbols(source),catalog=JSON.parse(fs.readFileSync(path.join(root,'profiles/iss-deluxe-assets.json'),'utf8'));
const profile={id:'iss-deluxe-usa-reference',title:'ISS Deluxe USA — reference',baseMD5:'345ddedcd63412b9373dabb67c11fc05',source:'https://github.com/Yoshifanatic1/International-Superstar-Soccer-Deluxe-SNES-Disassembly',revision:'d5b0e975c25c266d1a92692a62cb18462807c679',license:'GPL-3.0',symbols:imported.symbols.map(s=>({...s,source:'Yoshifanatic1 / ISS Deluxe USA'})),unresolved:imported.unknown,assets:catalog.assets};
fs.writeFileSync(path.join(root,'src/profile.js'),'/* ISS Deluxe reference derived from Yoshifanatic1 disassembly, GPL-3.0. See THIRD_PARTY.md. */\nwindow.ISS_PROFILE = '+JSON.stringify(profile)+';\n');
console.log('Profile built: '+profile.symbols.length+' symbols, '+profile.assets.length+' direct asset ranges.');
