# Planejador Pedagógico Maker

Ferramenta estática em HTML, CSS, JavaScript e Bootstrap para apoiar docentes de educação profissional na criação de prompts de planejamento pedagógico com cultura maker.

O projeto organiza uma experiência em quatro páginas:

1. **Como funciona**
2. **Prompt Mestre**
3. **Comandos**
4. **Anatomia do Prompt**

A proposta central é orientar o uso de uma IA generativa para criar situações de aprendizagem maker conectadas ao **plano de curso** e à **lista de materiais disponíveis**, evitando atividades genéricas, desconectadas de competências profissionais ou dependentes de histórico externo de conversas.

## Objetivo

O Planejador Pedagógico Maker ajuda o docente a:

- estruturar um prompt mestre robusto para uso em LLMs;
- garantir que a IA solicite os arquivos essenciais antes de gerar propostas;
- parametrizar tema, curso, unidade curricular, tempo, turma e restrições;
- gerar propostas maker conectadas a competências, indicadores, conhecimentos, habilidades, atitudes e valores;
- conduzir a conversa com comandos simples;
- entender a arquitetura do prompt e as técnicas utilizadas.

## Regra central do prompt

O prompt foi desenhado para sempre iniciar solicitando ou confirmando, **na conversa atual**, dois arquivos obrigatórios:

- plano de curso;
- lista de materiais da caixa maker.

Mesmo que o usuário já tenha trabalhado o tema em outra conversa, em outro LLM ou em um histórico anterior, a IA deve pedir os arquivos novamente ou confirmar que eles foram anexados no contexto atual.

Essa regra reduz o risco de:

- usar informações antigas;
- assumir materiais que não existem;
- inventar competências ou indicadores;
- gerar atividades sem base no plano de curso;
- depender de memória, preferências salvas ou histórico externo.

## Estrutura do projeto

```text
prompt-maker-main/
├── index.html
├── prompt-mestre.html
├── comandos.html
├── anatomia-prompt.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Páginas

### 1. Como funciona

Arquivo: `index.html`

Apresenta o fluxo geral da solução:

- leitura do plano de curso;
- leitura da lista de materiais;
- parametrização da aula;
- geração de propostas maker testáveis.

Também explica que a IA deve tratar cada planejamento como uma nova execução, sem depender de histórico externo.

### 2. Prompt Mestre

Arquivo: `prompt-mestre.html`

Contém o formulário principal para montar o prompt. O docente pode preencher:

- tema da aula;
- curso ou área;
- unidade curricular, competência ou módulo;
- tempo disponível;
- tamanho da turma;
- indicadores, habilidades, atitudes e valores;
- formato da aula;
- preferência maker;
- restrições;
- integração desejada.

A página permite gerar três saídas:

- **Prompt completo**: prompt mestre combinado com os parâmetros preenchidos;
- **Prompt Mestre**: instrução base para iniciar uma nova conversa;
- **Briefing**: apenas os parâmetros da aula.

### 3. Comandos

Arquivo: `comandos.html`

Manual com comandos copiáveis para conduzir a conversa com a IA.

Exemplo de sequência recomendada:

```text
/iniciar → /diagnostico → /parametros → /gerar → /comparar → /detalhar 1 → /rubrica
```

Alguns comandos disponíveis:

- `/iniciar`: solicita ou confirma plano de curso e lista de materiais;
- `/diagnostico`: apresenta mapa pedagógico e mapa maker;
- `/parametros`: revisa os dados da aula;
- `/gerar`: cria no mínimo três propostas maker;
- `/comparar`: compara as opções;
- `/detalhar 1`: detalha uma proposta escolhida;
- `/rubrica`: gera matriz de avaliação por evidências;
- `/seguranca`: lista cuidados de segurança;
- `/acessibilidade`: sugere adaptações inclusivas.

### 4. Anatomia do Prompt

Arquivo: `anatomia-prompt.html`

Explica o prompt em duas formas:

- **Modo resumido**: cartões com os principais blocos do prompt, técnica usada e motivo de uso;
- **Modo completo**: acordeões com trecho, técnica, justificativa e risco mitigado.

Essa página ajuda a entender por que o prompt foi construído com:

- definição de papel;
- isolamento de contexto;
- regra de entrada obrigatória;
- fonte de verdade documental;
- perguntas de parametrização;
- comandos textuais;
- estrutura de saída;
- checklist interno de qualidade.

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript puro;
- Bootstrap 5.3.3 via CDN;
- Google Fonts via CDN.

Não há etapa de build, empacotador ou backend.

## Como executar

Abra o arquivo `index.html` diretamente no navegador.

Como o projeto é estático, não é necessário instalar dependências ou iniciar servidor local.

Se preferir servir a pasta localmente, use qualquer servidor estático. Exemplo com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Personalização

### Alterar cores e estilo

Edite:

```text
assets/css/styles.css
```

As principais variáveis estão no bloco `:root`, incluindo:

- `--bg`;
- `--surface`;
- `--text`;
- `--muted`;
- `--primary`;
- `--accent`;
- `--accent-soft`.

### Alterar o Prompt Mestre

Edite a constante `promptMestre` em:

```text
assets/js/app.js
```

Esse é o texto principal copiado e combinado com os dados do formulário.

### Alterar comandos

Edite o array `comandos` em:

```text
assets/js/app.js
```

Cada comando possui:

- `cmd`;
- `title`;
- `desc`;
- `example`.

### Alterar campos do formulário

Edite:

```text
prompt-mestre.html
```

Se adicionar novos campos, também atualize a função `montarBriefing()` em:

```text
assets/js/app.js
```

## Funcionamento do JavaScript

O arquivo `assets/js/app.js` controla:

- renderização dos cartões de comandos;
- montagem do briefing;
- montagem do prompt completo;
- exibição da saída gerada;
- cópia para a área de transferência;
- feedback visual de cópia.

O mesmo arquivo é compartilhado entre as páginas, mas só inicializa os elementos que existem na página atual.

## Critérios pedagógicos embutidos

O prompt orienta a IA a gerar propostas que:

- nasçam de uma situação-problema profissional;
- mobilizem competências do plano de curso;
- usem materiais existentes sempre que possível;
- separem materiais existentes, opcionais, substituições e incertezas;
- incluam construção, teste, iteração e apresentação;
- tenham evidências observáveis de aprendizagem;
- considerem segurança, acessibilidade e descarte ou reuso;
- evitem atividades apenas decorativas.

## Observações

- O projeto não envia dados para servidor próprio.
- A cópia do prompt ocorre no navegador do usuário.
- A qualidade da resposta da IA depende dos arquivos anexados e da capacidade do LLM usado para ler documentos.
- O prompt foi escrito para funcionar em qualquer LLM conversacional que aceite instruções longas e arquivos anexados.


