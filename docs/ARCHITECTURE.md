# Arquitetura da prévia

## Implementado

| Caminho | Responsabilidade |
|---|---|
| `src/core.js` | Funções puras, identidade ROM, mapeamento padrão, recursos, edição e projeto |
| `src/app.js` | Interface local e ações sobre arquivos selecionados |
| `src/index.html`, `src/style.css` | Layout responsivo da bancada |
| `profiles/` | Fontes do perfil de referência |
| `tools/build-profile.js` | Gerar símbolos e catálogo de perfil |
| `tools/build.js` | Embutir código, estilos e perfil num HTML sem dependências |
| `portable/` | Aplicativo distribuído |
| `tools/snesrecomp_bridge.py` | Preparar chamada de uma instalação local externa |
| `tests/` | Núcleo sintético e automação da interface |

## Projeto

A base é normalizada sem cabeçalho de copiador e identificada por SHA-256. O arquivo raw conserva o cabeçalho original para exportação. Edições usam transações e diferenças por offset. O projeto versionado guarda edições, anotações e parâmetros da interface; a ROM não é embutida.

A carga do projeto valida todas as edições e anotações antes de substituir o estado. Base incorreta, offset inválido, byte inválido ou formato incompatível são rejeitados.

## Perfis e confiança

O perfil ISS USA é somente uma referência de metadados importados. Seu MD5 controla a habilitação de acesso ao catálogo. A consulta em outra ROM exige escolha explícita e não constitui validação.

Anotações distinguem confirmado, observado, provável e desconhecido. Medidas de entropia e candidatos ASCII nunca são classificações semânticas automáticas.

## Ainda proposto

Análise de fluxo global, compressão, composição OAM, drivers musicais, execução instrumentada, reconstrução por Asar e port via SNESRecomp são extensões futuras. Componentes de hardware SNES não estão incluídos no aplicativo portátil.

A interface não faz chamadas de rede. O CSP bloqueia conexões, plugins e formulários; os arquivos selecionados ficam no documento local. Não há armazenamento persistente automático.
