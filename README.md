# Staff English AI (PWA) 🇺🇸🇧🇷

**Staff English AI** é uma **Progressive Web App (PWA)** projetada para ajudar engenheiros de software a dominar o inglês técnico. A aplicação utiliza Inteligência Artificial (Google Gemini 2.0) para fornecer análises contextuais, bilíngues e instantâneas de termos técnicos, acelerando o aprendizado e a comunicação no ambiente corporativo global.

O projeto implementa uma arquitetura robusta com **Cache em Banco de Dados (PostgreSQL)**, garantindo respostas imediatas para termos já pesquisados e otimizando o consumo de tokens da IA.

---

## 🚀 Funcionalidades Principais

*   **🧠 Análise de IA Bilíngue**: Explicações detalhadas em Inglês e Português sobre o Significado, Contexto Técnico, Exemplo de Uso e Dicas de Pronúncia.
*   **⚡ Performance & Caching**: Integração com **PostgreSQL** e **Prisma ORM** para cachear requisições. Consultas repetidas são servidas instantaneamente do banco de dados local.
*   **💎 UI Premium (Glassmorphism)**: Interface moderna construída com **Tailwind CSS**, focado em legibilidade e experiência do usuário (UX).
*   **📱 PWA First**: Totalmente otimizado para dispositivos móveis, podendo ser instalado nativamente no Android e iOS.
*   **🛠️ Adminer Integrado**: Gerenciamento visual do banco de dados via Docker.

---

## 🛠️ Tech Stack

*   **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS.
*   **Backend**: Next.js API Routes.
*   **Database**: PostgreSQL 15 (via Docker).
*   **ORM**: Prisma 7 (com `@prisma/adapter-pg` para Edge compatibility).
*   **AI Model**: Google Gemini 2.0 Flash.
*   **Infra**: Docker & Docker Compose.

---

## 📦 Como Rodar Localmente

### Pré-requisitos
*   Node.js 18+
*   Docker & Docker Compose

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/staff-english-pwa.git
    cd staff-english-pwa
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz com suas chaves:
    ```env
    GEMINI_API_KEY=sua_chave_aqui
    DATABASE_URL="postgresql://postgres:password@localhost:5432/staff_english"
    ```

3.  **Inicie o Banco de Dados:**
    ```bash
    docker-compose up -d
    ```

4.  **Instale as Dependências e Configure o Banco:**
    ```bash
    npm install
    npx prisma generate
    npx prisma db push
    ```

5.  **Rode o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

Acesse a aplicação em `http://localhost:3000`.
Acesse o gerenciador do banco em `http://localhost:8080` (Server: `db`).
