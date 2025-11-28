# ConectaVoluntário 🤝

**ConectaVoluntário** é uma plataforma web que conecta voluntários a ONGs e projetos sociais. O sistema permite que ONGs cadastrem oportunidades de voluntariado e que voluntários se candidatem para participar de projetos que fazem a diferença na comunidade.

## 📋 Sobre o Projeto

O ConectaVoluntário foi desenvolvido com **Angular 19** e utiliza **Angular Material** para os componentes de interface. A aplicação oferece:

### Funcionalidades Principais

- **Para Voluntários:**
  - Navegação e busca de oportunidades de voluntariado
  - Visualização detalhada de projetos
  - Candidatura para participar de oportunidades
  - Visualização de organizações parceiras

- **Para ONGs:**
  - Painel de controle com acesso a:
    - **Dashboard**: Visualização de estatísticas e candidaturas
    - **Criar Projeto**: Publicação de novas oportunidades
    - **Editar Perfil**: Atualização de informações da organização
  - Gerenciamento de candidaturas de voluntários

- **Para Administradores:**
  - Acesso completo ao painel de controle
  - Gerenciamento de todas as funcionalidades

### Tecnologias Utilizadas

- **Frontend**: Angular 19
- **UI Components**: Angular Material
- **Estilização**: CSS Vanilla com design system customizado
- **Backend Mock**: JSON Server (simulação de API REST)
- **Ícones**: Material Icons

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (geralmente instalado junto com Node.js)

### Instalação

1. **Clone o repositório** (ou navegue até a pasta do projeto):
   ```bash
   cd ConectaVoluntario
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

### Executando a Aplicação

Para rodar o projeto completo, você precisa iniciar **dois servidores** em terminais separados:

#### Terminal 1 - Frontend (Angular)

Execute o servidor de desenvolvimento do Angular:

```bash
ng serve
```

Ou, se houver problemas com políticas de execução do PowerShell:

```bash
npx ng serve
```

O frontend estará disponível em: **http://localhost:4200**

#### Terminal 2 - Backend Mock (JSON Server)

Execute o JSON Server para simular a API:

```bash
npx json-server --watch db.json --port 3000
```

O backend estará disponível em: **http://localhost:3000**

### Acessando a Aplicação

Após iniciar ambos os servidores, abra seu navegador e acesse:

```
http://localhost:4200
```

## 👥 Usuários de Teste

### Administrador
- **Usuário**: `admin`
- **Senha**: `admin`

### ONGs Cadastradas
1. **Instituto Esperança**
   - Usuário: `ong_esperanca`
   - Senha: `esperanca123`

2. **Mãos que Ajudam**
   - Usuário: `ong_maos`
   - Senha: `maos123`

3. **Verde Vida**
   - Usuário: `ong_verde`
   - Senha: `verde123`

4. **Futuro Jovem**
   - Usuário: `ong_futuro`
   - Senha: `futuro123`

5. **Saúde Comunitária**
   - Usuário: `ong_saude`
   - Senha: `saude123`

## 📁 Estrutura do Projeto

```
ConectaVoluntario/
├── src/
│   ├── app/
│   │   ├── core/              # Serviços, guards e modelos
│   │   ├── features/          # Módulos de funcionalidades
│   │   │   ├── auth/          # Login e registro
│   │   │   ├── home/          # Página inicial
│   │   │   ├── opportunities/ # Oportunidades de voluntariado
│   │   │   ├── organizations/ # Organizações parceiras
│   │   │   └── ngo-dashboard/ # Painel de controle das ONGs
│   │   └── shared/            # Componentes compartilhados
│   ├── styles.css             # Estilos globais e design system
│   └── ...
├── db.json                    # Banco de dados mock (JSON Server)
└── package.json
```

## 🎨 Design System

O projeto utiliza um design system customizado com:
- Paleta de cores vibrante e moderna
- Componentes reutilizáveis
- Animações e transições suaves
- Design responsivo para mobile e desktop
- Modo escuro em componentes específicos

## 🛠️ Comandos Úteis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
ng serve

# Iniciar JSON Server
npx json-server --watch db.json --port 3000

# Gerar novo componente
ng generate component nome-do-componente

# Gerar novo serviço
ng generate service nome-do-servico
```

### Build

```bash
# Build de produção
ng build

# Build com otimizações
ng build --configuration production
```

### Testes

```bash
# Executar testes unitários
ng test

# Executar testes e2e
ng e2e
```

## 📊 Dados do Sistema

O sistema possui **15 oportunidades de voluntariado** distribuídas entre **5 ONGs**:

- **Instituto Esperança**: 3 projetos (Educação)
- **Mãos que Ajudam**: 3 projetos (Social)
- **Verde Vida**: 3 projetos (Meio Ambiente)
- **Futuro Jovem**: 3 projetos (Mentoria/Educação)
- **Saúde Comunitária**: 3 projetos (Saúde)

## 🔧 Solução de Problemas

### JSON Server não inicia

Se o JSON Server apresentar erros de sintaxe, verifique se o arquivo `db.json` está com encoding UTF-8 correto.

### Angular não compila

Certifique-se de que todas as dependências foram instaladas:
```bash
npm install
```

### Porta já em uso

Se a porta 4200 ou 3000 já estiver em uso, você pode especificar outra porta:
```bash
# Angular em outra porta
ng serve --port 4300

# JSON Server em outra porta
npx json-server --watch db.json --port 3001
```

**Nota**: Se mudar a porta do JSON Server, atualize também a URL da API nos serviços (`src/app/core/services/*.service.ts`).

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ usando Angular 19
