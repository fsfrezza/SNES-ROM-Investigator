# Referências e reutilização

## SNESRecomp

- Repositório: https://github.com/RetroPortingToolKit/snesrecomp
- Link original informado: https://github.com/mstan/snesrecomp
- Contrato de integração: https://github.com/RetroPortingToolKit/snesrecomp/blob/main/docs/LOCAL_CODEGEN_SDK.md
- Licença: https://github.com/RetroPortingToolKit/snesrecomp/blob/main/LICENSE

Possível aproveitamento: analisador 65816, geração de C, ambiente de execução, diagnóstico e integração pela CLI.

O projeto informa que cada título exige configuração, integração e validação. Tradução para C não recupera automaticamente arquitetura de alto nível.

A licença consultada em 13/10/2026 é PolyForm Noncommercial 1.0.0. Reutilização deve respeitar suas condições; uso comercial precisa ser tratado com o titular. Separar componentes não elimina obrigações de licença.

## ISS Deluxe disassembly

- Repositório: https://github.com/Yoshifanatic1/International-Superstar-Soccer-Deluxe-SNES-Disassembly
- Base e instruções: https://github.com/Yoshifanatic1/International-Superstar-Soccer-Deluxe-SNES-Disassembly/blob/main/readme.md
- Framework: https://github.com/Yoshifanatic1/SNES-ROM-Framework

Possível aproveitamento: mapas de ROM e RAM, símbolos, rotinas, scripts de extração, recursos gráficos e sistema de áudio.

O suporte declarado é à ROM USA original sem cabeçalho. A existência de definições PAL/Japan não comprova suporte a essas versões.

O repositório declara GPL-3.0. Antes de incorporar código, registrar arquivos utilizados, revisão, licença e avisos exigidos. Licenças das ferramentas não concedem direitos sobre conteúdo comercial de jogos.

## Política inicial

A prévia inclui metadados de referência derivados do disassembly ISS Deluxe: mapa de RAM e um subconjunto de intervalos diretos de recursos. Fontes, proveniência e licença estão documentadas em THIRD_PARTY.md. Nenhuma ROM, gráfico ou amostra comercial foi incorporada. O SNESRecomp permanece uma ferramenta externa opcional; seu adaptador ainda não foi validado com a instalação upstream.

