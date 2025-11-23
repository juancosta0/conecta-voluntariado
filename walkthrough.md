# ConectaVoluntário - Walkthrough

## Visão Geral
Este projeto é uma Single Page Application (SPA) desenvolvida em **Angular 19.2.6** que reproduz a plataforma de voluntariado solicitada. A aplicação segue uma arquitetura tradicional baseada em **NgModules** (sem Standalone Components), utiliza **CSS Vanilla** com variáveis para estilização e **Angular Material** para componentes de UI.

## Stack Tecnológica
- **Framework**: Angular 19.2.6
- **Arquitetura**: NgModules (Core, Shared, Features)
- **Estilização**: CSS Vanilla + CSS Variables (Fiel ao design system)
- **UI Kit**: Angular Material
- **Gerenciamento de Estado**: Signals (UI) e RxJS (HTTP)
- **Backend**: JSON-Server

## Estrutura do Projeto
```
src/app/
├── core/                   # Singleton services, guards
│   ├── guards/             # AuthGuard
│   └── services/           # AuthService, OpportunityService
├── features/               # Módulos de funcionalidade
│   ├── auth/               # Login
│   ├── home/               # Landing Page + Grid
│   └── opportunities/      # Detalhes e Candidatura
├── shared/                 # Componentes reutilizáveis (Header) e módulos compartilhados
└── app.module.ts           # Módulo raiz
```

## Funcionalidades Implementadas

### 1. Reprodução Visual (UI/UX)
- **Hero Section**: Título impactante com gradiente e botões de ação.
- **Grid de Vagas**: Cards com imagem, título, avaliação, localização e pílulas de categoria.
- **Paleta de Cores**: Extraída fielmente do site de referência.
  - Primary: `#2563eb` (Blue 600)
  - Background: `#f9fafb` (Gray 50)

### 2. Lógica de Negócio
- **Autenticação**: Login mockado (admin/admin) com persistência em LocalStorage.
- **Busca**: Filtro de oportunidades em tempo real (debounce 300ms) integrado ao JSON-Server.
- **Candidatura**: Fluxo de "Apply" protegido por verificação de login.

### 3. Configuração Técnica
- **Roteamento**: Lazy Loading para todos os módulos de feature.
- **HTTP**: Configurado via `provideHttpClient` no `AppModule`.

## Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o Backend (JSON-Server)**:
   ```bash
   npx json-server --watch db.json
   ```

3. **Iniciar o Frontend**:
   ```bash
   npm start
   ```
   Acesse `http://localhost:4200`.

## Demonstração
A aplicação inicia na Home com a listagem de vagas. O usuário pode buscar, ver detalhes e, ao tentar se candidatar, é redirecionado para o login se não estiver autenticado.
