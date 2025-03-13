# Charity Platform 🏆

Uma plataforma para facilitar doações a instituições beneficentes. O usuário pode criar uma conta, escolher uma instituição, fazer uma doação única e acompanhar seu histórico de doações.

## 📌 Funcionalidades

- 🔐 **Cadastro e Login:** Autenticação JWT para login seguro.
- 🏛️ **Escolha de Instituição:** Visualização de até 5 instituições disponíveis.
- 💰 **Doação Única:** O usuário pode doar um valor mínimo de R$ 5,00.
- 📜 **Histórico de Doações:** O usuário pode consultar suas doações passadas.
- ⭐ **Favoritos:** O usuário pode marcar uma instituição como favorita.

## 🏗️ Estrutura do Projeto

```
charity-platform/
├── backend/          # Laravel API (Autenticação, Doações, Instituições)
│   ├── app/
│   ├── database/
│   ├── routes/
│   ├── .env.example
│   └── ...
├── frontend/         # React + TypeScript (Interface do usuário)
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── ...
├── nginx/            # Configuração do Nginx
│   ├── default.conf
│   └── ...
├── docker-compose.yml  # Configuração Docker
├── Makefile            # Comandos úteis para rodar o projeto
└── README.md           # Documentação do projeto
```

## 🛠️ Tecnologias Utilizadas

* **Backend:** Laravel (PHP) para gerenciamento de autenticação e lógica de doações.

* **Frontend:** React + TypeScript para criação da interface do usuário.

* **Banco de Dados:** PostgreSQL para armazenar usuários e doações.

* **Autenticação:** JWT (JSON Web Token) para login seguro.

* **Servidor Web:** Nginx para roteamento e proxy reverso.

* **Conteinerização:** Docker e Docker Compose para facilitar a implantação.

* **Gerenciamento de Dependências:** Composer (backend) e npm (frontend).

## 🚀 Como Rodar o Projeto

### 📌 Pré-requisitos
- Docker e Docker Compose **OU** PHP 8+, Composer, Node.js, e PostgreSQL.

### 📦 Opção 1: Executar com `make prod` (Recomendado)
```sh
cp backend/.env.example backend/.env # Configure o .env
make prod
```
Isso iniciará os containers do backend e frontend automaticamente, além de executar as migrations e seeders.

O frontend estará disponível em http://localhost:8000 e o backend em http://localhost:8000/api.

### 🐳 Opção 2: Executar com Docker Compose Manualmente
```sh
cp backend/.env.example backend/.env # Configure o .env
docker compose up -d
```
Depois, rode as migrations:
```sh
docker compose exec backend php artisan migrate --seed
```

O frontend estará disponível em http://localhost:8000 e o backend em http://localhost:8000/api.

### 🔧 Opção 3: Rodar Manualmente (Sem Docker)

#### Backend (Laravel)
```sh
cd backend
cp .env.example .env  # Configure o .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

#### Frontend (React + TypeScript)
```sh
cd frontend
cp .env.example .env  # Configure o .env
npm install
npm run dev
```

O frontend estará disponível em http://localhost:5173 e o backend em http://localhost:8000/api.

## ⚙️ Configuração do `.env`
### 📌 Backend
Edite o arquivo `.env` na pasta `backend`, ajustando as configurações do banco de dados e do JWT.

### 📌 Frontend
Edite o arquivo `.env` na pasta `frontend`, configurando a URL da API backend.
