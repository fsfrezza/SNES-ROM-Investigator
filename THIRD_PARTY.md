# Componentes e referências de terceiros

## ISS Deluxe disassembly — GPL-3.0

Autor: Yoshifanatic1.
Fonte: https://github.com/Yoshifanatic1/International-Superstar-Soccer-Deluxe-SNES-Disassembly
Revisão de referência: d5b0e975c25c266d1a92692a62cb18462807c679.

Arquivos incorporados ou derivados:

- `profiles/iss-deluxe-usa-ram.asm`: mapa RAM original, com normalização das quebras de linha.
- `profiles/iss-deluxe-assets.json`: subconjunto derivado de `AsarScripts/AssetPointersAndFiles.asm`, contendo somente intervalos ROM expressos por endereços literais diretos. 1.653 registros não diretos foram omitidos pelo importador; não representa catálogo completo.
- `src/profile.js`: símbolos e catálogo convertidos em objeto JavaScript pelo nosso gerador.
- Trecho `ISS_PROFILE` no HTML portátil: cópia embutida dos dados de perfil gerados.

A licença GPL-3.0 original está em `third_party/iss-deluxe/LICENSE`. O pacote distribui também os arquivos-fonte correspondentes e o gerador do perfil. Os dados não foram validados contra uma ROM USA nesta entrega. O hash MD5 esperado vem do README upstream.

O código próprio do protótipo ainda não recebeu licença pública definida. A licença upstream permanece aplicável aos arquivos derivados; esta nota não restringe os direitos concedidos por ela nem conclui a compatibilidade de uma distribuição comercial futura.

## SNESRecomp — referência / ferramenta externa opcional

https://github.com/RetroPortingToolKit/snesrecomp
Licença consultada: PolyForm Noncommercial 1.0.0.
Nenhum código ou executável desse projeto está embutido. `tools/snesrecomp_bridge.py` apenas prepara comandos para uma instalação local fornecida pelo usuário. O adaptador não foi testado com o executável upstream nesta entrega.

## Ferramentas de desenvolvimento

Node.js para testes e geração; Python para empacotamento e adaptador opcional; Playwright 1.62.1 para testes da interface. Não são necessários para abrir o HTML portátil. Dependências de desenvolvimento não são distribuídas dentro do aplicativo.
