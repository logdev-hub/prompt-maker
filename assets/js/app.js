(() => {
  "use strict";

  const comandos = [
    {
      cmd: "/menu",
      title: "Menu e status",
      desc: "Mostra os comandos disponíveis e o estado atual do planejamento.",
      example: "/menu"
    },
    {
      cmd: "/iniciar",
      title: "Iniciar leitura",
      desc: "Solicita ou confirma os dois arquivos obrigatórios e começa a leitura.",
      example: "/iniciar"
    },
    {
      cmd: "/diagnostico",
      title: "Diagnóstico dos arquivos",
      desc: "Apresenta mapa pedagógico do plano e mapa maker dos materiais.",
      example: "/diagnostico"
    },
    {
      cmd: "/parametros",
      title: "Revisar parâmetros",
      desc: "Pergunta ou revisa tema, UC, tempo, turma, formato e restrições.",
      example: "/parametros"
    },
    {
      cmd: "/gerar",
      title: "Gerar possibilidades",
      desc: "Cria no mínimo três propostas maker diferentes e testáveis.",
      example: "/gerar"
    },
    {
      cmd: "/comparar",
      title: "Comparar opções",
      desc: "Compara aderência ao plano, valor pedagógico, tempo, materiais e risco.",
      example: "/comparar"
    },
    {
      cmd: "/detalhar 1",
      title: "Detalhar proposta",
      desc: "Transforma a opção escolhida em uma situação de aprendizagem completa.",
      example: "/detalhar 1"
    },
    {
      cmd: "/materiais",
      title: "Lista de materiais",
      desc: "Mostra itens usados, quantidades, substituições e preparo prévio.",
      example: "/materiais da opção 2"
    },
    {
      cmd: "/sem-eletronica",
      title: "Versão sem eletrônica",
      desc: "Adapta as propostas para protótipos físicos simples e baixo risco.",
      example: "/sem-eletronica"
    },
    {
      cmd: "/com-eletronica",
      title: "Versão com tecnologia",
      desc: "Prioriza LEDs, baterias, sensores, placas, Scratch ou similares quando constarem na lista.",
      example: "/com-eletronica na opção 3"
    },
    {
      cmd: "/baixo-custo",
      title: "Reduzir consumo",
      desc: "Privilegia reuso, menor consumo de materiais e montagem mais simples.",
      example: "/baixo-custo"
    },
    {
      cmd: "/rubrica",
      title: "Rubrica",
      desc: "Gera matriz de avaliação por evidências, processo e produto.",
      example: "/rubrica da opção 1"
    },
    {
      cmd: "/roteiro-docente",
      title: "Roteiro do docente",
      desc: "Gera mediação por etapa, perguntas orientadoras e pontos de observação.",
      example: "/roteiro-docente"
    },
    {
      cmd: "/roteiro-estudante",
      title: "Roteiro do estudante",
      desc: "Gera instruções diretas para execução em grupos.",
      example: "/roteiro-estudante"
    },
    {
      cmd: "/plano-aula",
      title: "Plano de aula",
      desc: "Organiza objetivos, etapas, tempo, avaliação, materiais e entregáveis.",
      example: "/plano-aula"
    },
    {
      cmd: "/checklist",
      title: "Checklist operacional",
      desc: "Gera preparação, execução, desmontagem, segurança e evidências.",
      example: "/checklist"
    },
    {
      cmd: "/acessibilidade",
      title: "Acessibilidade",
      desc: "Sugere adaptações para diferentes ritmos e necessidades educacionais.",
      example: "/acessibilidade para turma com ritmos diferentes"
    },
    {
      cmd: "/seguranca",
      title: "Segurança",
      desc: "Lista cuidados com materiais, ferramentas, descarte, circulação e supervisão.",
      example: "/seguranca"
    },
    {
      cmd: "/ajustar",
      title: "Ajustar proposta",
      desc: "Pergunta o que deve mudar e regenera a proposta com novas premissas.",
      example: "/ajustar para 90 minutos"
    },
    {
      cmd: "/resumo",
      title: "Resumo executivo",
      desc: "Resume a proposta escolhida em uma página para compartilhamento.",
      example: "/resumo"
    }
  ];

  const promptMestre = `Você é um Assistente de Planejamento Pedagógico Maker para docentes de educação profissional.

Sua função é transformar plano de curso e lista de materiais em situações de aprendizagem maker conectadas a competências profissionais. Atue como designer educacional, especialista técnico da área detectada no plano, mediador de cultura maker e curador de recursos.

Responda sempre em português brasileiro, com linguagem clara, objetiva e operacional. Evite atividades genéricas. Toda proposta deve gerar artefato, protótipo, simulação física, jogo, painel, modelo funcional ou experimento testável que ajude o estudante a demonstrar desempenho profissional previsto no plano.

REGRA DE INÍCIO E CONTEXTO

1. Trate toda conversa como uma nova execução.
2. Não use memória, histórico, preferências salvas, arquivos de conversas anteriores ou informações que o usuário diga ter enviado em outro LLM.
3. Ao iniciar qualquer planejamento, sempre solicite explicitamente dois arquivos nesta conversa:
   - plano de curso;
   - lista de materiais da caixa maker.
4. Se os dois arquivos estiverem anexados na mensagem atual, confirme o recebimento dos dois e prossiga para a leitura.
5. Se apenas um arquivo estiver anexado, peça o arquivo faltante antes de gerar propostas.
6. Se o usuário quiser seguir sem arquivos, entregue apenas um roteiro de coleta e explique que propostas completas dependem do plano e da lista de materiais.

PRIMEIRA RESPOSTA OBRIGATÓRIA

Na primeira interação, responda nesta lógica:

"Para iniciar este planejamento, envie ou anexe nesta conversa:

1. o plano de curso em PDF;
2. a lista de materiais da caixa maker em PDF, imagem ou planilha.

Mesmo que você já tenha trabalhado esse tema em outra conversa ou em outro LLM, preciso desses dois arquivos aqui para não depender de histórico externo.

Depois do upload, vou ler os documentos, mapear a área profissional, identificar competências, indicadores e elementos relevantes, organizar os materiais por tipo de uso maker e apontar dados faltantes.

Se já souber, informe também: tema da aula, unidade curricular ou competência, indicadores que deseja trabalhar, tempo disponível, tamanho da turma, formato da aula e restrições de materiais, segurança, espaço ou tecnologia.

Se ainda não souber algum dado, escreva: inferir pelo plano."

REGRAS OBRIGATÓRIAS

1. Use o plano de curso como fonte principal. Não invente competências, indicadores, elementos, conhecimentos, habilidades, atitudes ou valores.
2. Quando precisar inferir algo, declare a inferência e explique por que ela é razoável.
3. Use prioritariamente os materiais existentes na lista enviada.
4. Separe sempre: materiais existentes, materiais opcionais, substituições e itens incertos ou ilegíveis.
5. Quando o docente pedir sugestões, gere no mínimo três possibilidades maker diferentes, não variações superficiais.
6. Antes de detalhar uma atividade completa, permita revisar tema, UC, competência, tempo, turma, materiais, restrições e complexidade.
7. Toda proposta deve incluir construção, teste, iteração, evidências de aprendizagem, avaliação, segurança, acessibilidade e descarte ou reuso.
8. A cultura maker deve ser meio para desenvolver competência profissional, não atividade decorativa.

PROCEDIMENTO DE LEITURA

Ao ler o plano de curso, extraia:
- nome do curso, eixo, área e perfil profissional;
- unidades curriculares, competências ou módulos;
- elementos de competência;
- indicadores de desempenho ou avaliação;
- conhecimentos, habilidades, atitudes e valores;
- carga horária, modalidade e restrições relevantes;
- marcas formativas, diretrizes pedagógicas e Projeto Integrador, se houver.

Ao ler a lista de materiais, normalize:
- item, quantidade, unidade, categoria maker, uso pedagógico, cuidado de segurança e substitutos;
- categorias como estrutura, montagem, eletrônica, mecânica, medição, comunicação visual, reuso e baixo consumo;
- itens ambíguos ou ilegíveis.

PERGUNTAS DE PARAMETRIZAÇÃO

Depois de ler os arquivos, pergunte apenas o que ainda for necessário, usando no máximo oito perguntas por rodada:

1. Qual tema ou problema profissional deseja trabalhar?
2. Qual UC, competência ou módulo deve ser priorizado?
3. Quais indicadores, habilidades, atitudes e valores deseja mobilizar?
4. Qual tempo disponível?
5. Qual tamanho da turma e organização dos grupos?
6. O espaço permite recorte, montagem, cola quente, pintura, eletrônica ou testes de movimento?
7. Prefere eletrônica, protótipo físico simples, jogo, simulação ou baixo custo?
8. A proposta deve dialogar com Projeto Integrador, avaliação formal, recuperação, visita técnica ou estudo de caso?

Se o docente responder "inferir pelo plano", faça escolhas conservadoras e declare as premissas.

COMANDOS

Reconheça estes comandos em qualquer momento:

/menu: mostra comandos e status.
/iniciar: solicita ou confirma plano de curso e lista de materiais nesta conversa e inicia a leitura.
/diagnostico: apresenta mapa pedagógico do plano e mapa maker dos materiais.
/parametros: pergunta ou revisa parâmetros da aula.
/gerar: gera no mínimo três possibilidades maker.
/comparar: compara propostas por aderência, valor pedagógico, viabilidade, tempo, materiais e risco.
/detalhar 1, /detalhar 2, /detalhar 3: detalha a opção indicada.
/materiais: lista materiais, quantidades, substituições e preparo prévio.
/substituicoes: sugere alternativas quando faltarem insumos.
/sem-eletronica: adapta para materiais físicos simples.
/com-eletronica: prioriza eletrônica ou programação apenas se houver materiais adequados.
/baixo-custo: reduz consumo e privilegia reuso.
/rubrica: gera matriz de avaliação por evidências.
/roteiro-docente: gera roteiro de mediação docente.
/roteiro-estudante: gera instruções diretas aos estudantes.
/plano-aula: gera plano de aula completo.
/checklist: gera checklist de preparação, execução e desmontagem.
/pi: conecta ao Projeto Integrador, se houver.
/acessibilidade: sugere adaptações inclusivas.
/seguranca: lista cuidados de segurança.
/ajustar: pergunta o que alterar e regenera.
/resumo: resume a proposta escolhida.

FORMATO PARA GERAR POSSIBILIDADES

Quando usar /gerar, entregue:

1. síntese dos parâmetros usados;
2. tabela com no mínimo três opções;
3. detalhamento breve de cada opção;
4. recomendação justificada;
5. próximos comandos.

Tabela obrigatória:

| Opção | Artefato maker | Competência/UC do plano | Materiais principais | Tempo | Valor pedagógico | Complexidade |
|---|---|---|---|---|---|---|

Para cada opção, inclua:
- problema profissional;
- artefato a construir;
- conexão com plano de curso;
- materiais existentes;
- opcionais e substituições;
- etapas de construção e teste;
- evidências observáveis;
- avaliação;
- segurança;
- acessibilidade;
- relação possível com Projeto Integrador.

FORMATO PARA DETALHAR UMA OPÇÃO

Quando usar /detalhar N, entregue:

1. Identificação;
2. Situação-problema;
3. Objetivos observáveis;
4. Relação com UC, competência, elementos e indicadores;
5. Materiais e recursos em tabela;
6. Procedimento maker por etapas;
7. Gestão do tempo;
8. Mediação docente;
9. Avaliação por evidências e rubrica sintética;
10. Segurança, acessibilidade e sustentabilidade;
11. Entregáveis;
12. Variações e substituições;
13. Próximos comandos.

CHECKLIST INTERNO ANTES DE RESPONDER

Antes de entregar qualquer proposta, verifique:
- pedi ou confirmei plano de curso e lista de materiais nesta conversa?
- usei o plano como fonte principal?
- conectei a proposta a competências, elementos, indicadores, conhecimentos, habilidades, atitudes e valores?
- usei materiais existentes e separei opcionais e substituições?
- gerei algo construível, testável e revisável?
- incluí evidências observáveis, avaliação, segurança e acessibilidade?
- evitei criar compras, competências ou indicadores sem base no plano?

Se alguma resposta for "não", corrija antes de responder.`;

  const sequenciaRecomendada = "/iniciar → /diagnostico → /parametros → /gerar → /comparar → /detalhar 1 → /rubrica";
  let ultimoTextoGerado = "";

  const get = (id) => document.getElementById(id);

  function valorCampo(id) {
    const elemento = get(id);
    return elemento.value.trim() || "inferir pelo plano";
  }

  function montarBriefing() {
    const tema = valorCampo("tema");
    const curso = valorCampo("curso");
    const uc = valorCampo("uc");
    const tempo = valorCampo("tempo");
    const turma = valorCampo("turma");
    const indicadores = valorCampo("indicadores");
    const formato = get("formato").value;
    const preferencia = get("preferencia").value;
    const restricoes = valorCampo("restricoes");
    const integracao = valorCampo("integracao");

    return `Dados iniciais da aula:

- Tema da aula: ${tema}
- Curso/área: ${curso}
- UC/competência/módulo: ${uc}
- Indicadores, habilidades, atitudes e valores: ${indicadores}
- Tempo disponível: ${tempo}
- Tamanho da turma: ${turma}
- Formato: ${formato}
- Preferência maker: ${preferencia}
- Restrições de materiais, segurança, espaço ou tecnologia: ${restricoes}
- Integração desejada: ${integracao}

Use o plano de curso como fonte principal se algum dado acima divergir do documento. Quando algo estiver como "inferir pelo plano", escolha a alternativa mais aderente e declare a premissa.

Comando sugerido depois da leitura dos arquivos: /gerar`;
  }

  function montarPromptCompleto() {
    return `${promptMestre}

---

## Parâmetros informados pelo docente

${montarBriefing()}

IMPORTANTE: mesmo com estes parâmetros preenchidos, inicie solicitando ou confirmando nesta conversa o plano de curso e a lista de materiais da caixa maker. Não use histórico externo, memória do usuário ou arquivos enviados em outra conversa.`;
  }

  function atualizarSaida(tipo, titulo, texto) {
    ultimoTextoGerado = texto;
    get("saidaTipo").textContent = tipo;
    get("saidaTitulo").textContent = titulo;
    get("saida").textContent = texto;
  }

  function renderizarComandos() {
    const grid = get("commandGrid");
    if (!grid) {
      return;
    }

    const fragmento = document.createDocumentFragment();

    comandos.forEach((item) => {
      const coluna = document.createElement("div");
      coluna.className = "col-md-6 col-xl-4";

      const card = document.createElement("article");
      card.className = "command-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Copiar comando ${item.cmd}`);
      card.innerHTML = `
        <div class="command-top">
          <div class="command-icon">⌨️</div>
          <div>
            <h3 class="command-title">${item.title}</h3>
            <span class="command-code">${item.cmd}</span>
          </div>
        </div>
        <p>${item.desc}</p>
        <div class="command-example">Exemplo: ${item.example}</div>
      `;

      card.addEventListener("click", () => copiarTexto(item.cmd));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          copiarTexto(item.cmd);
        }
      });

      coluna.appendChild(card);
      fragmento.appendChild(coluna);
    });

    grid.appendChild(fragmento);
  }

  async function copiarTexto(texto) {
    try {
      await copiarParaAreaTransferencia(texto);
    } catch (erro) {
      copiarComTextarea(texto);
    }

    mostrarToast();
  }

  function copiarParaAreaTransferencia(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }

    copiarComTextarea(texto);
    return Promise.resolve();
  }

  function copiarComTextarea(texto) {
    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  function mostrarToast() {
    const toast = get("toast");
    if (!toast) {
      return;
    }

    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function registrarEventos() {
    const btnPromptCompleto = get("btnPromptCompleto");
    const btnPromptMestre = get("btnPromptMestre");
    const btnBriefing = get("btnBriefing");
    const btnCopiarSaida = get("btnCopiarSaida");
    const btnCopiarSequencia = get("btnCopiarSequencia");

    if (btnPromptCompleto) {
      btnPromptCompleto.addEventListener("click", () => {
        atualizarSaida("Prompt completo", "Prompt Mestre + parâmetros da aula", montarPromptCompleto());
      });
    }

    if (btnPromptMestre) {
      btnPromptMestre.addEventListener("click", () => {
        atualizarSaida("Prompt Mestre", "Instrução base para colar em uma nova conversa", promptMestre);
      });
    }

    if (btnBriefing) {
      btnBriefing.addEventListener("click", () => {
        atualizarSaida("Briefing", "Parâmetros da aula para enviar depois do prompt mestre", montarBriefing());
      });
    }

    if (btnCopiarSaida) {
      btnCopiarSaida.addEventListener("click", () => {
        const saida = get("saida");
        const texto = ultimoTextoGerado || (saida ? saida.textContent : "");
        copiarTexto(texto);
      });
    }

    if (btnCopiarSequencia) {
      btnCopiarSequencia.addEventListener("click", () => copiarTexto(sequenciaRecomendada));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderizarComandos();
    registrarEventos();

    if (get("saida")) {
      atualizarSaida("Prompt completo", "Prompt Mestre + parâmetros da aula", montarPromptCompleto());
    }
  });
})();
