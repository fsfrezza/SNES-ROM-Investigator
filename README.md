# SNES ROM Investigator

Aplicativo em planejamento para investigar, documentar e editar ROMs de SNES, com perfis por jogo e um caminho gradual para recompilação e reconstrução em PC.

## Estado atual

Repositório inicial de documentação. Ainda não existe aplicativo executável, analisador implementado ou port validado. As funcionalidades abaixo são objetivos.

## Objetivos

- Identificar ROM, revisão, cabeçalho de copiador, mapeamento e hardware necessário.
- Explorar bancos, código 65816, referências, gráficos, paletas, textos e áudio.
- Registrar descobertas com origem, evidências e grau de confiança.
- Importar conhecimento de disassemblies através de adaptadores.
- Editar recursos mantendo a ROM-base imutável.
- Exportar alterações e reconstruir ROMs de forma determinística.
- Integrar recompilação para C e validar ports por título.
- Permitir substituição gradual de gráficos, áudio e sistemas por implementações modernas.

## Princípios

Ler instruções não equivale a compreender regras do jogo. O núcleo geral oferece ferramentas; perfis fornecem formatos e conhecimento específicos. ROMs desconhecidas terão análise parcial, sem promessa de conversão automática completa.

Um executável recompilado pode continuar dependendo de modelos de hardware SNES. Uma reconstrução em engine moderna exige recuperar e reimplementar os sistemas do jogo.

## Primeiro caso de estudo

International Superstar Soccer Deluxe, versão USA original, sem cabeçalho. O disassembly de referência declara MD5 `345ddedcd63412b9373dabb67c11fc05`. Este valor identifica a base indicada pelo autor; ainda não foi validado pelo nosso software.

Deluxe Plus será um perfil distinto. Seus endereços e estruturas precisam ser verificados antes da aplicação de mapas da ROM original.

## Documentação

- [Arquitetura proposta](docs/ARCHITECTURE.md)
- [Roteiro e critérios de conclusão](docs/ROADMAP.md)
- [Referências e reutilização](docs/REFERENCES.md)

## Conteúdo do repositório

Não incluir ROMs comerciais, recursos extraídos ou código gerado de jogos sem autorização de redistribuição. Testes futuros devem usar dados sintéticos e exemplos redistribuíveis.

Nenhum código dos projetos de referência foi incorporado nesta inicialização. A licença do código próprio será definida antes de sua publicação.
