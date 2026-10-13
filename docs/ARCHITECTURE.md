# Arquitetura proposta

Esta especificação descreve o desenho pretendido; não representa implementação existente.

## Componentes

| Componente | Responsabilidade |
|---|---|
| Núcleo de ROM | Identidade, cabeçalho, bancos, conversão de endereços e limites |
| Análise | Decodificação 65816, estado M/X, fluxo de controle e referências |
| Catálogo | Blocos de dados, gráficos, paletas, composição de sprites, textos e áudio |
| Perfis | Revisões suportadas, formatos, compressão, tabelas e regras específicas |
| Observação de execução | Importar traces e relacionar acessos com recursos e rotinas |
| Projeto | Alterações, anotações, recursos externos e proveniência |
| Reconstrução | Aplicar mudanças em cópia, validar ponteiros e gerar resultados determinísticos |
| Recompilação | Adaptador externo para SNESRecomp e configuração por título |
| Interface | Exploração, comparação, edição, visualização e diagnósticos |

## Modelo de projeto

A ROM-base é imutável e identificada por hash. O projeto referencia essa base e guarda operações de edição, símbolos e recursos. Ao abrir um projeto, a identidade da base deve ser verificada. A geração produz um arquivo separado.

Cada descoberta registra tipo, intervalo, espaço de endereços, revisão, origem, evidência e confiança. Endereço CPU e offset de arquivo são campos distintos. Cabeçalho de copiador e espelhamentos precisam ser considerados.

Estados de confiança: confirmado, observado, provável e desconhecido. Cobertura de execução é distinta de compreensão semântica. Dados não vistos em um trace não podem ser automaticamente declarados inúteis.

## Perfis

Perfis devem declarar identidade e revisões aceitas, assinaturas verificáveis, símbolos, formatos e restrições de edição. Um perfil incompatível não aplica alterações automaticamente.

O primeiro adaptador importará informações do disassembly ISS Deluxe. Assembly Asar possui macros e expressões: um leitor de texto simples não pode ser tratado como avaliador completo. A importação deve preservar trechos não resolvidos e a origem dos símbolos.

## Recursos

A visualização de tiles não comprova que um personagem completo foi recuperado. Sprites podem depender de composição OAM, paletas, flips, poses e gráficos dinâmicos.

Extração de BRR não recupera por si só partitura ou eventos musicais. Drivers SPC700 e formatos de sequência podem variar por título.

## Validação

- Reconstrução sem edição deve reproduzir byte a byte a ROM normalizada, com política explícita para cabeçalho.
- Edições devem respeitar limites, bancos, ponteiros e compressão.
- Comparações de execução devem usar entradas e cenários reproduzíveis.
- Ports precisam comparar estado relevante, imagem e áudio com uma referência; compilar não comprova jogabilidade.

## Tecnologia

A stack da interface e do núcleo ainda não foi escolhida. A integração inicial com SNESRecomp deve preferir seu contrato de CLI e progresso JSON, com versão fixada e testes de compatibilidade.
