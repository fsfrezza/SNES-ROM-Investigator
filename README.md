# SNES ROM Investigator

Bancada local para investigar e editar ROMs de SNES. **Prévia funcional 0.1.0**, com fonte completo e um HTML portátil que funciona sem instalar dependências.

## Testar no Windows

1. No GitHub, use **Code → Download ZIP** e extraia a pasta.
2. Abra `Abrir-Investigator.cmd` ou dê dois cliques em `portable/SNES-ROM-Investigator.html`.
3. Use **Demonstração** para testar com dados sintéticos, ou **Abrir ROM** para escolher uma `.sfc` / `.smc` (extraia ZIPs antes).
4. Faça uma pequena edição, salve o projeto e exporte uma ROM nova para testar no emulador.

Chrome ou Edge recentes são o alvo inicial. O HTML trabalha com arquivos escolhidos localmente e não faz chamadas de rede. Não precisa de Python, Node ou servidor para funcionar. Execute a versão baixada; a página de código do GitHub não executa o HTML.

## Funcionalidades implementadas

| Ferramenta | Comportamento |
|---|---|
| Identificação | Cabeçalho SNES, detecção heurística LoROM/HiROM, cabeçalho de copiador, SHA-256, MD5 e CRC32 |
| Mapa | Blocos de 32 KiB, entropia, proporção 00/FF e possíveis sequências ASCII |
| Hexadecimal | Navegação, busca, edição por transação, desfazer e refazer |
| Endereços | Conversão de janelas padrão LoROM/HiROM até 4 MiB; rejeição de WRAM e janelas incompatíveis |
| Tiles | Prévia 2/4/8 bpp, seleção, pintura de pixels e exportação PNG |
| Paletas | Leitura e edição de cores RGB de 15 bits, exportação JSON |
| Código | Decodificador dos 256 opcodes 65816, M/X inicial selecionável, bloco linear conservador |
| Áudio | Amostra BRR de endereço conhecido → prévia e WAV; taxa selecionável |
| Comparação | Base versus segunda ROM, diferenças por intervalo, relatório JSON |
| Recursos ISS | 938 intervalos diretos de referência com filtros, consulta e extração BIN |
| Símbolos | 119 símbolos de RAM ISS USA, filtro e importador limitado de defines Asar |
| Descobertas | Anotações por intervalo com confiança e evidência |
| Projetos | `.snesproj` com identidade SHA-256, edições, anotações e parâmetros da visualização |
| Exportação | ROM nova com cabeçalho de copiador preservado e patch IPS |
| Checksum | Recálculo opcional em uma transação, para tamanhos em potência de 2 até 8 MiB |

## Base preservada

A ROM escolhida é a base imutável da sessão. Edições ficam em uma cópia. O projeto não contém a ROM: para retomá-lo, abra a mesma base e depois o `.snesproj`. Projetos com hash diferente são rejeitados. Salve antes de fechar ou trocar de ROM; não há salvamento automático.

Os offsets mostrados excluem os 512 bytes do cabeçalho de copiador, quando detectado. O IPS usa offsets do arquivo original, incluindo esse cabeçalho. Não aplique o patch a outra revisão.

## Perfil ISS Deluxe

O mapa de referência foi derivado do disassembly de Yoshifanatic1. A base USA esperada tem MD5 `345ddedcd63412b9373dabb67c11fc05`. Nesta entrega, testamos o núcleo com a ROM Deluxe Plus do usuário; ela é diferente da base USA e não é tratada como compatível automaticamente.

Na aba **Recursos ISS**, o catálogo fica disponível como documentação. Para consultar os offsets em uma ROM diferente, existe uma opção explícita, desligada por padrão. Ativá-la não valida compatibilidade. Os 938 intervalos são apenas registros diretos; estruturas compostas, paletas especiais e outros registros foram omitidos.

## Limites desta prévia

- Não executa o jogo nem produz um port jogável de PC.
- Não detecta automaticamente todas as funções ou o significado dos dados.
- Não descomprime gráficos, monta sprites OAM ou interpreta drivers musicais.
- A prévia de tiles não comprova o formato de um bloco. 8 bpp usa paleta indexada convencional; modo direto de cor não implementado.
- BRR exporta PCM sem envelope DSP, interpolação, sequência musical ou reprodução de loop.
- ExHiROM permite inspeção por offset, sem conversão CPU. Mapeamentos especiais e coprocessadores não estão implementados para análise de execução.
- Conversão de endereços não infere espelhamento por tamanho nem expansão ExLoROM.
- Checksum é opcional, não automático. Tamanhos não potência de 2 exigem outro método ainda não implementado.
- Importações de símbolos são de consulta nesta sessão; exporte-as separadamente para preservar.

## Desenvolvimento

```sh
npm install --ignore-scripts
npm test
npm run build
npx playwright install chromium
npm run test:ui
python tools/package.py
```

O núcleo e o gerador não precisam de pacotes externos. Playwright é uma dependência de desenvolvimento. O CI testa núcleo e interface e publica um artefato portátil em **Actions**.

A interface de teste usa dados sintéticos. Para teste local com ROM particular, defina `SRI_TEST_ROM` com um caminho local; nunca envie a ROM ao repositório.

## Adaptador opcional SNESRecomp

Com Python e uma instalação local do SNESRecomp:

```sh
python tools/snesrecomp_bridge.py --cli "C:/SNESRecomp/snesrecomp.exe" --rom "C:/ROMs/game.sfc" --output "C:/Projetos/GameRecomp" --dry-run
```

Remova `--dry-run` para chamar a ferramenta. O resultado ainda exige integração e validação por título. Esse adaptador não baixa ferramentas, não fornece ROMs e não foi validado contra uma instalação upstream nesta entrega.

## Documentação e licenças

- [Guia de teste](docs/TESTING.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Roteiro](docs/ROADMAP.md)
- [Referências](docs/REFERENCES.md)
- [Componentes de terceiros](THIRD_PARTY.md)

Nenhuma ROM ou recurso comercial extraído acompanha a entrega. O perfil derivado usa GPL-3.0; consulte a licença incluída. A licença do código próprio ainda será definida.
