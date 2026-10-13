# Roteiro de desenvolvimento

## Entregue na prévia 0.1.0

- Núcleo local de cabeçalho, hashes e mapeamento padrão.
- Editor hexadecimal, busca, comparação e projetos com identidade verificada.
- Tiles planares, pintura, paletas e PNG.
- Bloco linear 65816 e amostra BRR → WAV.
- Mapa de bancos e possíveis textos ASCII.
- 119 símbolos de RAM e 938 intervalos diretos ISS Deluxe USA.
- Exportação de ROM, IPS e checksum opcional.
- Fonte completo, gerador portátil e suíte de testes.

## Próximo marco: recursos com contexto

- Validar o catálogo contra a ROM USA original.
- Importar registros compostos e paletas especiais.
- Decodificar compressões do ISS Deluxe.
- Associar tiles, paletas e composições OAM para mostrar sprites completos.
- Validar diferenças do Plus e construir um perfil distinto.
- Implementar busca de referências e integração de traces.

Conclusão: um conjunto delimitado de sprites é extraído, editado, reinserido e conferido na execução original.

## Marco seguinte: análise e recompilação

- Integrar o contrato de CLI SNESRecomp na interface.
- Fixar versão do framework e configurar o título.
- Resolver limites de função e despachos indiretos com evidências.
- Testar boot, menus e cenário de partida reproduzível.

Conclusão: port executa os cenários documentados e possui relatório de divergências; teste de boot não significa suporte completo.

## Recursos modernos e generalização

- Substituir um recurso visual e um evento de áudio no port.
- Adicionar um segundo jogo para verificar a separação núcleo/perfil.
- Ampliar mecanismos de descoberta com confiança e proveniência.
- Avaliar aplicativo desktop após validar a bancada portátil.
