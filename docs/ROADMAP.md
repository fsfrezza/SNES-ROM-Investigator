# Roteiro de desenvolvimento

Todos os itens estão pendentes.

## 1. Núcleo de investigação

- Abrir .sfc e .smc; detectar cabeçalho de copiador por validação.
- Calcular identidade, apresentar cabeçalho e identificar mapeamentos suportados.
- Navegar entre endereço CPU e offset de arquivo.
- Visualizar hexadecimal e tiles com paleta selecionável.
- Salvar e reabrir anotações em projeto.

Conclusão: testes com ROMs sintéticas cobrem mapeamento, limites e persistência; formatos desconhecidos geram diagnóstico claro.

## 2. Perfil ISS Deluxe USA

- Importar símbolos e mapas com origem rastreável.
- Validar a ROM-base esperada.
- Implementar extração de um conjunto delimitado de recursos.
- Visualizar pelo menos um sprite composto com paleta correta.

Conclusão: comparar recursos com a execução original e documentar os intervalos ainda desconhecidos.

## 3. Edição e reconstrução

- Editar uma paleta ou recurso validado.
- Gerar cópia modificada e relatório de alterações.
- Verificar reconstrução sem mudanças.
- Validar o recurso editado em execução.

Conclusão: identidade da base preservada, geração reproduzível e ausência de alterações fora do escopo previsto.

## 4. Prova de recompilação

- Fixar versão do SNESRecomp.
- Gerar C e configurar integração do título.
- Investigar caminhos indiretos e código alcançado dinamicamente.
- Testar boot, menus e um cenário de partida reproduzível.

Conclusão: port executa os cenários definidos e possui relatório de divergências. Não anunciar suporte completo a partir de teste de boot.

## 5. Recursos modernos e generalização

- Substituir um recurso visual ou sonoro mantendo eventos e sincronização.
- Adicionar um segundo jogo para verificar a separação entre núcleo e perfil.
- Desenvolver perfil Deluxe Plus mediante comparação validada.
- Ampliar análise de execução e ferramentas de documentação.

Conclusão: segundo jogo usa o mesmo núcleo sem pressupostos específicos do ISS; melhorias são testadas individualmente.
