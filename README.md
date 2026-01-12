# Staff English AI (PWA) 🇺🇸🇧🇷

**[English](#english)** | **[Português](#português-br)**

---

<br>

<div id="english"></div>

# English

**Staff English AI** is a **Progressive Web App (PWA)** designed to help software engineers master technical English. The application uses Artificial Intelligence (Google Gemini 2.0) to provide instant, bilingual contextual analysis of technical terms, accelerating learning and communication in the global corporate environment.

The project implements a robust architecture with **Database Caching (PostgreSQL)**, ensuring immediate responses for previously searched terms and optimizing AI token usage.

## 🚀 Key Features

*   **🧠 Bilingual AI Analysis**: Detailed explanations in English and Portuguese about Meaning, Technical Context, Usage Examples, and Pronunciation Tips.
*   **📚 Study Mode (Flashcards)**: New interactive review system where users can practice saved terms. Includes flip cards with the term on the front and meaning/translation on the back.
*   **⚡ Performance & Caching**: Integration with **PostgreSQL** and **Prisma ORM** to cache requests. Repeated queries are served instantly from the local database.
*   **💎 Premium UI (Glassmorphism)**: Modern interface built with **Tailwind CSS**, focused on readability and user experience (UX).
*   **📱 PWA First**: Fully optimized for mobile devices, installable natively on Android and iOS.
*   **🛠️ Integrated Adminer**: Visual database management via Docker.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS.
*   **Backend**: Next.js API Routes.
*   **Database**: PostgreSQL 15 (via Docker).
*   **ORM**: Prisma 7 (with `@prisma/adapter-pg` for Edge compatibility).
*   **AI Model**: Google Gemini 2.0 Flash.
*   **Infra**: Docker & Docker Compose.

## 📦 How to Run Locally

### Prerequisites
*   Node.js 18+
*   Docker & Docker Compose

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/staff-english-pwa.git
    cd staff-english-pwa
    ```

2.  **Configure Environment Variables:**
    Create a `.env` file in the root with your keys:
    ```env
    GEMINI_API_KEY=your_key_here
    DATABASE_URL="postgresql://postgres:password@localhost:5432/staff_english"
    ```

3.  **Start the Database:**
    ```bash
    docker-compose up -d
    ```

4.  **Install Dependencies and Setup Database:**
    ```bash
    npm install
    npx prisma generate
    npx prisma db push
    ```

5.  **Verify Connection (Optional):**
    To ensure DB and Prisma are communicating correctly:
    ```bash
    npx tsx --env-file=.env scripts/verify-db.ts
    ```

6.  **Run Development Server:**
    ```bash
    npm run dev
    ```

Access the application at `http://localhost:3000`.
Access the database manager at `http://localhost:8080` (Server: `db`).

<br>

---

<br>

<div id="português-br"></div>

# Português (BR)

**Staff English AI** é uma **Progressive Web App (PWA)** projetada para ajudar engenheiros de software a dominar o inglês técnico. A aplicação utiliza Inteligência Artificial (Google Gemini 2.0) para fornecer análises contextuais, bilíngues e instantâneas de termos técnicos, acelerando o aprendizado e a comunicação no ambiente corporativo global.

O projeto implementa uma arquitetura robusta com **Cache em Banco de Dados (PostgreSQL)**, garantindo respostas imediatas para termos já pesquisados e otimizando o consumo de tokens da IA.

## 🚀 Funcionalidades Principais

*   **🧠 Análise de IA Bilíngue**: Explicações detalhadas em Inglês e Português sobre o Significado, Contexto Técnico, Exemplo de Uso e Dicas de Pronúncia.
*   **📚 Modo Estudo (Flashcards)**: Novo sistema de revisão interativa onde os usuários podem praticar os termos salvos. Inclui cartões viráveis com o termo na frente e o significado/tradução no verso.
*   **⚡ Performance & Caching**: Integração com **PostgreSQL** e **Prisma ORM** para cachear requisições. Consultas repetidas são servidas instantaneamente do banco de dados local.
*   **💎 UI Premium (Glassmorphism)**: Interface moderna construída com **Tailwind CSS**, focado em legibilidade e experiência do usuário (UX).
*   **📱 PWA First**: Totalmente otimizado para dispositivos móveis, podendo ser instalado nativamente no Android e iOS.
*   **🛠️ Adminer Integrado**: Gerenciamento visual do banco de dados via Docker.

## 🛠️ Tech Stack

*   **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS.
*   **Backend**: Next.js API Routes.
*   **Database**: PostgreSQL 15 (via Docker).
*   **ORM**: Prisma 7 (com `@prisma/adapter-pg` para Edge compatibility).
*   **AI Model**: Google Gemini 2.0 Flash.
*   **Infra**: Docker & Docker Compose.

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

5.  **Verifique a Conexão (Opcional):**
    Para garantir que o banco e o Prisma estão se comunicando corretamente:
    ```bash
    npx tsx --env-file=.env scripts/verify-db.ts
    ```

6.  **Rode o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

Acesse a aplicação em `http://localhost:3000`.
Acesse o gerenciador do banco em `http://localhost:8080` (Server: `db`).
