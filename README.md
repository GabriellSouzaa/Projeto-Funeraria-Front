# 🕊️ Genro Feliz — Sistema de Gestão para Funerária (Front-end)

> *"Hoje, Amanhã e Sempre — Guiando você com respeito e carinho"*

Aplicação web para a gestão completa de uma funerária: clientes e seus beneficiários, planos funerários (com cálculo automático de juros por atraso), caixões e suas vendas, salas de velório, falecimentos, vendedores e planos de saúde parceiros. Tem relatórios em PDF e notificações por e-mail.

Este repositório tem o **front-end em Angular 17**. A API REST fica no repositório do back-end:
👉 **[Projeto-Funeraria-Back](https://github.com/GabriellSouzaa/Projeto-Funeraria-Back)** (Spring Boot 3 + PostgreSQL)

![Demonstração do sistema](docs/images/demo.gif)

---

## 📑 Sumário

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Telas](#-telas)
- [Destaques: funções interessantes](#-destaques-funções-interessantes)
- [Como executar](#-como-executar)
- [Estrutura do projeto](#-estrutura-do-projeto)

---

## 🧰 Tecnologias

| Camada | Tecnologias |
|---|---|
| Framework | **Angular 17** (standalone components) |
| UI | **PrimeNG 17** (tabelas, diálogos, dropdowns, tooltips, toasts), **Bootstrap 5**, Angular Material/CDK |
| Ícones | Bootstrap Icons, PrimeIcons, Ionicons |
| Gráficos | **Chart.js 4** |
| Autenticação | JWT guardado no `localStorage`, `HttpInterceptor` que envia o `Bearer` token e `AuthGuard` nas rotas |
| Back-end | Spring Boot 3.3, Spring Security, JPA/Hibernate, PostgreSQL, JasperReports, Thymeleaf + JavaMail |

---

## ✨ Funcionalidades

| Módulo | O que faz |
|---|---|
| 🔐 **Autenticação** | Login e cadastro de usuários (perfis `ADMIN` / `USER`), sessão via JWT com validade de 2h |
| 📊 **Dashboard** | Cards com urnas disponíveis, planos vendidos, planos em atraso e data atual, além de um gráfico de vendas |
| 👥 **Clientes** | CRUD com busca por nome/CPF/RG, ordenação, paginação e máscaras de CPF/RG |
| ⏰ **Clientes em atraso** | Lista os planos vencidos com **dias de atraso** e **valor corrigido com juros**, gera relatório em PDF e envia e-mail de cobrança |
| 🕯️ **Beneficiários falecidos** | Filtra os beneficiários inativos de um cliente e envia e-mail de condolências ao titular |
| 👨‍👩‍👧 **Beneficiários** | CRUD de dependentes vinculados a um titular, com valor adicional no plano |
| 📄 **Planos funerários** | CRUD dos planos (valor, data de envio, cliente) |
| ⚰️ **Caixões (urnas)** | CRUD com material, cor, comprimento, modelo e preço |
| 🧾 **Venda de caixão** | Registro de vendas (vendedor × urna × cliente) e relatório mensal |
| 🏛️ **Salas de velório** | CRUD e relatório das salas mais usadas no mês |
| ✝️ **Falecimentos** | Registro de óbitos: sala, urna, conservação química e causa |
| 🧑‍💼 **Vendedores** | CRUD e relatório mensal de vendas por vendedor |
| 🩺 **Planos de saúde** | CRUD dos planos de saúde parceiros |
| 👤 **Perfil** | Exibe os dados do usuário logado |

---

## 🖼️ Telas

### Login e cadastro

| Login | Cadastro de usuário |
|---|---|
| ![Login](docs/images/01-login.png) | ![Registro](docs/images/02-registro.png) |

### Dashboard

![Dashboard](docs/images/03-dashboard.png)

### Clientes

Listagem com busca instantânea por **nome, CPF ou RG**, ordenação e paginação. CPF e RG aparecem formatados.

| Listagem | Busca por "Silva" |
|---|---|
| ![Clientes](docs/images/04-clientes.png) | ![Busca de clientes](docs/images/04b-clientes-busca.png) |

| Cadastro de cliente | Edição de cliente |
|---|---|
| ![Cadastro de cliente](docs/images/08-cadastro-cliente.png) | ![Edição de cliente](docs/images/09-editar-cliente.png) |

**Beneficiários do cliente**: o botão azul da linha abre os dependentes do titular, com opção de gerar um relatório em PDF.

![Beneficiários do cliente](docs/images/07-beneficiarios-do-cliente.png)

### Demais módulos

| Planos funerários | Caixões |
|---|---|
| ![Planos funerários](docs/images/10-planos-funerarios.png) | ![Caixões](docs/images/11-caixoes.png) |

| Beneficiários | Salas de velório |
|---|---|
| ![Beneficiários](docs/images/12-beneficiarios.png) | ![Salas de velório](docs/images/13-salas-de-velorio.png) |

| Vendedores | Venda de caixão |
|---|---|
| ![Vendedores](docs/images/14-vendedores.png) | ![Venda de caixão](docs/images/15-venda-de-caixao.png) |

| Falecimentos | Planos de saúde |
|---|---|
| ![Falecimentos](docs/images/16-falecimentos.png) | ![Planos de saúde](docs/images/17-planos-de-saude.png) |

| Perfil do usuário |
|---|
| ![Perfil](docs/images/18-editar-usuario.png) |

---

## 🌟 Destaques: funções interessantes

### 1. Cálculo automático de juros para planos em atraso

O modal **Clientes em Atraso** consulta `GET /funeral-plan/atrasados`. Para cada plano vencido, o back-end calcula:

- **Dias de atraso**: diferença entre a data de vencimento e hoje.
- **Valor a pagar**: juros compostos de **5% ao mês** sobre o valor do plano:

```java
long mesesAtraso = ChronoUnit.MONTHS.between(
        funeralPlan.getDataPagamento().withDayOfMonth(1),
        hoje.withDayOfMonth(1));
valor = (float) (valor * Math.pow(1 + 0.05, mesesAtraso));   // formatado em R$ (pt-BR)
```

Exemplo real com os dados de exemplo: um plano de **R$ 2.300,75** vencido há 955 dias passa a valer **R$ 10.440,89**.

![Clientes em atraso](docs/images/05-clientes-em-atraso.png)

Na mesma tela:
- **Gerar Relatório**: baixa um PDF (JasperReports) com todos os planos atrasados.
- **✉️ Enviar e-mail**: dispara um e-mail HTML (template Thymeleaf) de cobrança para o cliente, já com o valor corrigido e os dias de atraso.

### 2. Notificação de beneficiário falecido

No modal **Beneficiários Falecidos**, você escolhe um titular num dropdown com filtro e o sistema lista os beneficiários inativos dele. Um clique envia ao titular um e-mail de condolências gerado a partir de um template HTML.

| Seleção do titular | Ação de envio (tooltip) |
|---|---|
| ![Beneficiários falecidos](docs/images/06-beneficiarios-falecidos.png) | ![Tooltip de envio de e-mail](docs/images/06b-beneficiarios-falecidos-tooltip.png) |

> Prévias dos e-mails e dos relatórios PDF estão no [README do back-end](https://github.com/GabriellSouzaa/Projeto-Funeraria-Back#-relatórios-em-pdf-jasperreports).

### 3. Relatórios em PDF com um clique

Vários módulos têm um botão **Gerar Relatório**. O front pede o PDF como `Blob` e dispara o download:

| Tela | Relatório |
|---|---|
| Clientes → Beneficiários do cliente | Beneficiários de um titular |
| Clientes → Clientes em atraso | Planos funerários atrasados |
| Salas de velório | Salas de velório mais usadas no mês |
| Vendedores | Vendas mensais por vendedor |
| Venda de caixão | Vendas mensais de urnas |

### 4. Segurança no cliente

- `AuthGuard` bloqueia todas as rotas internas sem token e redireciona para o login.
- `HttpInterceptor` adiciona `Authorization: Bearer <token>` em todas as requisições.
- No back-end, as rotas de listagem de clientes e de planos exigem a role `ADMIN`.

---

## 🚀 Como executar

### Pré-requisitos

- **Node.js 18+** e npm
- **Back-end rodando** em `http://localhost:8080` ([instruções no repositório do back-end](https://github.com/GabriellSouzaa/Projeto-Funeraria-Back#-como-executar))

### Passos

```bash
cd genro-feliz
npm install
npm start          # equivale a: ng serve
```

Acesse **http://localhost:4200**.

O CORS do back-end aceita apenas a origem `http://localhost:4200`, então mantenha essa porta.

### Primeiro acesso

Crie um usuário pela tela **Registre-se** ou direto pela API:

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","password":"admin123","role":"ADMIN",
       "firstName":"Admin","lastName":"Demo","cpf":"00000000000","dataNascimento":"1990-01-01"}'
```

Use um usuário com role **`ADMIN`**: as listagens de clientes e planos exigem essa permissão.

---

## 🗂️ Estrutura do projeto

```
genro-feliz/src/app/
├── app.routes.ts                  # rotas protegidas por AuthGuard
├── app.config.ts                  # providers (HttpClient + interceptor, animations)
└── genro-feliz/
    ├── login/  register/  edit-user/
    ├── pagina-inicial/            # dashboard com cards e Chart.js
    ├── clientes/                  # CRUD + modais (atraso, falecidos, beneficiários)
    ├── clientes-atraso/           # juros, relatório e e-mail de cobrança
    ├── clientes-com-beneficiarios-falecidos/
    ├── beneficiarios/  planos-funerarios/  caixao/  venda-de-caixao/
    ├── salas-de-velorio/  morte-de-paciente/  vendedores/  planos-de-saude/
    ├── side-nav/  breadcrumb/  dashboard/  data-hora-atual/
    └── shared/
        ├── guard/authguard.ts
        ├── interceptor/funeraria.interceptor.ts
        ├── models/                # interfaces TypeScript
        └── services/              # um service por recurso da API
```

---

Projeto acadêmico desenvolvido com Angular e Spring Boot.
