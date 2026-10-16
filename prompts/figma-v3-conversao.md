# Prompt — Variação do Portfolio v3 focada em conversão

> Como usar: preencha a seção **"0. Dados para preencher"** (o que não souber, deixe em branco),
> depois cole tudo a partir de **"Tarefa"** em uma conversa com o Claude.

---

## 0. Dados para preencher antes de rodar

Tudo que ficar em branco vira um placeholder visível `[preencher: ...]` no Figma.
O Claude **não pode inventar** números, clientes ou depoimentos.

| Campo | Valor |
|---|---|
| Tempo de resposta real (ex.: 24h) | |
| Atende remoto / quais regiões | |
| Prazo médio de uma landing page | |
| Prazo para enviar proposta após a conversa | |
| Dias de suporte após a entrega | |
| Nº de projetos entregues (se souber) | |
| Curso / universidade (opcional, para o "Sobre") | |
| Ferramentas de IA/automação que você usa (ex.: n8n, OpenAI, Make) | |
| **Cop-15** — problema, o que você fez, resultado | |
| **Acupuncture Landing Page** — problema, o que você fez, resultado | |
| **Wellnova Software** — problema, o que você fez, resultado | |
| Depoimento 1 — texto, nome, cargo, empresa (com autorização) | |
| Depoimento 2 — texto, nome, cargo, empresa (com autorização) | |
| Links reais: LinkedIn, Instagram, GitHub, Behance | |

---

## Tarefa

Crie no Figma uma **variação do Portfolio v3 focada em conversão**: o objetivo é que o visitante
(cliente ou recrutador) entenda em 5 segundos o que eu entrego e chegue ao contato com o mínimo de atrito.
Todos os textos em PT-BR, primeira pessoa, tom direto e confiante.

### Arquivo e escopo

- Arquivo: `VMFiY4kAtwa5NuYDBYKtWV` (Portfolio), página **"Portfolio v3"** (`109:722`).
- Base: duplique o frame **"Portfolio v3 — Light"** (`109:723`) e posicione a cópia à direita dele (200px de espaço).
  Nomeie a cópia **"Portfolio v3 — Conversão (Light)"**.
- **Não altere**: `109:723`, `110:761` (Dark), a página "Portfolio v2" e a "Page 1".
- Antes de usar o `use_figma`, carregue as skills `figma:figma-use` e `figma:figma-generate-design`.
- Comece com `get_metadata` no `109:723` para mapear seções, instâncias e variáveis existentes.

### Regras de design

1. Use **só** as variáveis da coleção "Tokens" (modo Light), os text styles e os componentes que já existem
   (Button, Tag, Service Row, Project Card, Form Field, Contact Info, Nav Item, ícones). Nada de hex solto.
2. Componentes novos (Button/Secondary outline, Proof Item, Process Step, Testimonial Card, FAQ Item,
   Availability Badge) ficam em um frame novo **"Components — Conversão"** na página v3, nunca no frame
   Components da v2.
3. Se precisar de uma cor nova, crie uma **variável nova** (com valor para Light e Dark). Não mude o valor de
   variáveis existentes, porque isso alteraria os frames originais. A cor de fundo alternada de seção deve ser
   `color/bg/section-alt` = `#e2e8f0` no Light e um navy escuro equivalente no Dark.
4. **Um CTA principal por tela** (preenchido, `brand`). As ações secundárias ficam em botão outline ou link com seta.
   Os botões da hero têm altura mínima de 48px.
5. O CTA principal tem **o mesmo texto em todo o site: "Pedir orçamento"** (abre o WhatsApp `wa.me/5518991597894`).
6. Auto layout em todas as seções novas, com espaçamentos dos tokens `space/*`.
7. Textos sem dado real ficam como `[preencher: ...]` com fundo `warning` claro, para ficarem fáceis de achar.
   **Nunca invente** métricas, nomes de clientes ou depoimentos.

### Nova ordem das seções

Header → Hero → Faixa de prova → Serviços → Projetos → Como funciona → Sobre + Experiência →
Depoimentos → FAQ → Contato (CTA final) → Footer

(Projetos sobem porque recrutadores e clientes leem só 1 ou 2 casos; Processo, Depoimentos e FAQ respondem
objeções logo antes do contato.)

---

## Conteúdo de cada seção

### Header
- Itens do menu: **Início · Serviços · Projetos · Sobre · Experiência · Contato**
  ("Home" vira "Início" e "Resumo" vira "Experiência", para ficar tudo em PT).
- Botão da direita: **"Pedir orçamento"**. A seta desenhada continua apontando para ele.
- O item ativo usa o fundo `brand` (azul), não o contorno escuro.

### Hero
- Badge acima do nome: **"● Disponível para novos projetos"** (ponto verde, fundo claro).
- H1: **"LUÍS EDUARDO."** (com acento; mantém o gradiente atual).
- Subtítulo, menor e em caixa normal: **"UI/UX Designer & Dev Fullstack"** (sem o "|" no fim da linha).
- Proposta de valor (body-lg, até 2 linhas):
  **"Desenho e desenvolvo sites, produtos digitais e automações com IA que transformam visitantes em clientes — do Figma ao deploy."**
- Botões: **[Pedir orçamento]** (principal, ícone de WhatsApp) + **[Ver projetos →]** (outline, rola até Projetos).
- Microcopy abaixo dos botões: **"Resposta em até [tempo de resposta] · Primeira conversa sem compromisso"**
- Linha de prova: **"Atuação atual: Mega Jr. · Ouronova"**
- Remova o bloco antigo "INTRODUÇÃO / texto / Lorem ipsum / Minha história".
- Ícones do Figma e do React: mesmo estilo nos dois (chip de vidro claro), uns 30% menores, sem cobrir rosto nem ombro.

### Faixa de prova (nova, logo abaixo da hero)
Faixa fina com 3 itens lado a lado (ícone + título curto + linha de apoio):
1. **Design + código** · "Uma pessoa só, do protótipo ao deploy. Nada se perde na passagem."
2. **Foco em resultado** · "Cada tela pensada para levar o usuário à ação."
3. **Atendimento direto** · "Você fala comigo do primeiro contato à entrega."
(Se o número de projetos entregues tiver sido preenchido, troque o item 3 por "[N] projetos entregues".)

### Serviços — "Como eu ajudo você a crescer?"
- Fundo: `color/bg/section-alt`.
- Subtítulo novo abaixo do título: **"Escolha o que você precisa — ou combine tudo em um projeto só."**
- Cada Service Row recebe **descrição e tags próprias** (hoje as quatro são iguais). Mantenha as listas de
  detalhes atuais e o 01 aberto (variante Expanded).

| # | Título | Descrição (ao lado do título) | Tags | CTA |
|---|---|---|---|---|
| 01 | IA & automações | "Agentes de IA e automações que respondem clientes, organizam dados e eliminam tarefas repetitivas, para sua equipe focar no que gera receita." | Agentes de IA · Chatbots · Integrações | Quero automatizar |
| 02 | Product Design | "Do problema à solução validada: pesquiso, estruturo e testo o produto com usuários reais antes de investir em desenvolvimento." | Pesquisa · Fluxos · Testes de usabilidade | Desenhar meu produto |
| 03 | UI/UX Design | "Interfaces claras e consistentes, pensadas para guiar o usuário até a ação e prontas para o time de desenvolvimento." | Figma · Design System · Protótipos | Melhorar minha interface |
| 04 | Dev. Web | "Sites, landing pages e aplicações web rápidos, responsivos e otimizados para SEO, prontos para vender." | React · TypeScript · SEO | Tirar meu site do papel |

- No painel expandido do 01, adicione a linha **"Ideal para: empresas que perdem horas com atendimento, planilhas e tarefas manuais."**
  Se as ferramentas de IA tiverem sido preenchidas, use-as como tags do 01.

### Projetos — "Meus projetos"
- Texto abaixo do título (no lugar do Lorem): **"Alguns projetos recentes, com o desafio, o processo e o resultado de cada um."**
- Cada Project Card ganha: tag de categoria, uma linha de **Desafio**, uma linha de **Resultado** e o link
  **"Ver estudo de caso →"**. Cada card precisa de uma imagem diferente (hoje dois repetem a mesma). Se faltar
  imagem, use um retângulo placeholder com o nome do projeto.

| Projeto | Categoria | Desafio | Resultado |
|---|---|---|---|
| Cop-15 | UI/UX Design | [dado preenchido ou `preencher`] | [dado preenchido ou `preencher`] |
| Acupuncture Landing Page | Landing page | [dado preenchido ou `preencher`] | [dado preenchido ou `preencher`] |
| Wellnova Software | Product Design | [dado preenchido ou `preencher`] | [dado preenchido ou `preencher`] |

- Escreva cada linha com no máximo 12 palavras, sempre no formato "verbo + resultado".

### Como funciona (nova)
Título: **"Como funciona"**. Subtítulo: **"Um processo simples, sem surpresas."**
4 passos numerados, na horizontal:
1. **Conversa inicial** · "20 minutos para entender seu objetivo, público e prazo. Sem compromisso."
2. **Proposta** · "Você recebe escopo, prazo e investimento por escrito em até [prazo da proposta]."
3. **Design e desenvolvimento** · "Entregas semanais para você acompanhar e dar feedback."
4. **Entrega e suporte** · "Publicação, orientação de uso e [dias de suporte] de suporte após a entrega."
CTA abaixo: **[Pedir orçamento]**.

### Sobre (substitui o Lorem)
**"Sou o Luís Eduardo, UI/UX Designer e Desenvolvedor Fullstack. Hoje atuo na Mega Jr., como UI/UX Designer e
Diretor Comercial, e na Ouronova, como UI/UX Designer e Dev Fullstack. Gosto de unir design e código: entendo o
negócio, desenho a experiência e entrego o produto funcionando. Como diretor comercial, aprendi o que faz um
cliente dizer sim, e levo isso para cada interface que crio."**
(Se o curso/universidade tiver sido preenchido, adicione uma frase curta sobre isso.)

### Experiência — "Minha experiência profissional"
Descrições novas (no lugar do Lorem):
- **Mega Jr. · UI/UX Designer** (ago 2025 – atual): "Desenho interfaces e protótipos para os projetos de clientes da empresa, da pesquisa ao handoff."
- **Mega Jr. · Diretor comercial** (ago 2025 – atual): "Lidero a área comercial: prospecção, diagnóstico das necessidades dos clientes e fechamento de projetos."
- **Ouronova · UI/UX Designer | Dev Fullstack** (mai 2026 – atual): "Desenho e desenvolvo produtos digitais, do protótipo no Figma ao código em produção."
Marque as três com uma nota pequena **[revisar]**, porque são um rascunho meu.

### Depoimentos (nova)
Título: **"O que dizem sobre o meu trabalho"**. Dois Testimonial Cards (aspas, texto, foto/iniciais, nome, cargo, empresa).
Use os depoimentos preenchidos. Se não houver, use `[preencher: depoimento real e autorizado]` e uma nota:
"Só publicar com depoimento real. Sugestão: pedir a clientes da Mega Jr."

### FAQ (nova)
Título: **"Perguntas frequentes"**. 4 itens em acordeão (o primeiro aberto):
1. **Quanto custa um projeto?** · "Depende do escopo. Depois da conversa inicial você recebe uma proposta fechada, sem surpresas."
2. **Quanto tempo leva?** · "Uma landing page leva em média [prazo da landing page]. Projetos maiores são divididos em etapas com entregas parciais."
3. **Você atende fora da minha cidade?** · "[resposta conforme o campo de atendimento remoto]"
4. **Preciso ter o design pronto?** · "Não. Posso cuidar só do design, só do desenvolvimento ou do projeto completo."

### Contato — CTA final
- Título: **"Vamos tirar seu projeto do papel?"**
- Texto: **"Me conte sua ideia em poucas linhas. Respondo em até [tempo de resposta] com os próximos passos."**
- Botão principal grande: **[Pedir orçamento no WhatsApp]**. Email e telefone continuam como Contact Info.
- Formulário enxuto, com 4 campos: **Nome · Email ou WhatsApp · Tipo de projeto** (chips selecionáveis: IA &
  automações, Product Design, UI/UX Design, Dev. Web) **· Mensagem**. Remova "Localização".
- Botão do formulário (outline, para não competir com o WhatsApp): **"Enviar mensagem"**.
- Microcopy: **"Seus dados são usados só para responder ao seu contato."**

### Footer
Mantenha. Ícones sociais com os links preenchidos ou `[preencher: link]`.

---

## Anotações de conversão

À direita do frame novo (fora dele), crie para cada seção um card de anotação alinhado na mesma altura,
com o título "Por quê" e 1 ou 2 frases explicando a decisão de conversão (ex.: Hero: "Proposta de valor +
um CTA único reduzem a dúvida sobre o que você entrega e o que fazer em seguida."). Use estilo neutro,
claramente separado do layout.

## Protótipo

- Crie o flow **"Portfólio — Conversão"** começando no frame novo.
- Itens do menu rolam até as seções (como no v3). "Ver projetos" rola até Projetos. Os botões
  "Pedir orçamento" rolam até o Contato.
- Mantenha os toggles Collapsed/Expanded do Service Row e faça o FAQ abrir e fechar com Smart Animate.

## Verificação antes de terminar

1. `get_screenshot` de cada seção do frame novo: confira texto cortado, sobreposição e alinhamento.
2. Procure em todos os text nodes do frame novo por "Lorem", "Nisl" e "ipsum": o resultado precisa ser zero.
3. Confira que nenhuma cor está fora das variáveis e que os frames `109:723` e `110:761` não mudaram.
4. No fim, me mande: o link do frame novo, a lista de todos os `[preencher: ...]` que sobraram e os
   componentes/variáveis criados.
