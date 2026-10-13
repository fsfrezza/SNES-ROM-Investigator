# Guia de teste da prévia 0.1.0

## Sem uma ROM

Clique em Demonstração. O arquivo é sintético e foi criado para este projeto.

- Tiles: offset `000000`, 4 bpp; paleta `009000`.
- BRR: offset `00A000`, um bloco com END.
- Código: offset `004000`; o bloco termina em XCE, cuja mudança de estado exige nova escolha M/X.
- Texto ASCII: offset `009200`.

Pinte um pixel, desfaça e confira que a contagem de bytes editados volta a zero. Salve um projeto, faça outra edição e reabra o projeto. Exporte uma ROM e abra o arquivo exportado numa nova sessão para conferir.

## Com a sua ROM

Guarde a base original. Abra uma cópia e confira tamanho, mapeamento e hashes. Use o mapa para localizar intervalos, o hexadecimal para verificar bytes e os tiles para explorar gráficos não comprimidos.

Na aba Recursos ISS, o catálogo corresponde à ROM USA do disassembly. Para o Plus, ele fica bloqueado por padrão. Consulta manual dos offsets pode produzir gráficos reconhecíveis ou dados diferentes; isso não comprova que toda a estrutura seja compatível.

Antes de exportar uma ROM editada, o checksum pode ser recalculado com o botão dedicado. Essa operação é uma edição que também pode ser desfeita. Teste a ROM exportada no emulador de sua preferência; esta entrega não inclui emulador nem testa partidas automaticamente.

## Validação realizada localmente

- 16 testes do núcleo passaram, cobrindo hashes, cabeçalhos, endereço, tiles, paletas, edições, projeto, IPS, diferenças, 65816, BRR, símbolos, bancos e checksum.
- ROM Plus do usuário: hashes conferidos com Node crypto; exportação sem edição idêntica byte a byte; edição/reabertura de projeto e desfazer conferidos.
- Scripts embutidos no HTML passam na verificação sintática.

A suíte Playwright passou no GitHub Actions, em Chromium: demonstração, edição, desfazer, projeto, busca, tiles, paleta, BRR, disassembly, símbolos, anotações seguras, tela pequena e ausência de chamadas de rede. O teste com ROM real foi feito no núcleo localmente; a ROM particular não foi enviada ao CI.

Execução inicial validada: https://github.com/fsfrezza/SNES-ROM-Investigator/actions/runs/38377872474. Testes adicionais de mapa, catálogo, PNG e checksum estão na suíte atual.
