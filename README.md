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
- **Dados**: LocalStorage (inicializado via JSON)
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

O projeto utiliza **LocalStorage** para simular o banco de dados, então você só precisa rodar o frontend!

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   ng serve
   ```

2. **Acesse a aplicação**:
   Abra seu navegador em `http://localhost:4200`

**Nota:** Na primeira vez que você abrir, o sistema irá carregar automaticamente os dados iniciais. Tudo o que você fizer (criar contas, candidatar-se) ficará salvo no seu navegador.

## 👥 Usuários de Teste

### 👑 Administrador
- **Nome**: Administrador
- **Usuário**: `admin`
- **Senha**: `admin`

### 🏢 ONGs (Organizações)
| Nome | Usuário | Senha |
|------|---------|-------|
| Instituto Esperança | `ong_esperanca` | `esperanca123` |
| Mãos que Ajudam | `ong_maos` | `maos123` |
| Verde Vida | `ong_verde` | `verde123` |
| Futuro Jovem | `ong_futuro` | `futuro123` |
| Saúde Comunitária | `ong_saude` | `saude123` |

### 🙋‍♂️ Voluntários
| Nome | Usuário | Senha |
|------|---------|-------|
| João Silva | `joao.silva` | `senha123` |
| Maria Santos | `maria.santos` | `senha123` |
| Pedro Oliveira | `pedro.oliveira` | `senha123` |
| Ana Rodrigues | `ana.rodrigues` | `senha123` |
| Carlos Ferreira | `carlos.ferreira` | `senha123` |
| Júlia Costa | `julia.costa` | `senha123` |
| Rafael Alves | `rafael.alves` | `senha123` |
| Fernanda Lima | `fernanda.lima` | `senha123` |
| Novo Voluntário | `novo.voluntario` | `senha123` |

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
│   ├── assets/
│   │   └── data/
│   │       └── initial-data.json # Dados iniciais da aplicação
│   ├── styles.css             # Estilos globais e design system
│   └── ...
├── package.json
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

## 🔧 Solução de Problemas

### Angular não compila

Certifique-se de que todas as dependências foram instaladas:
```bash
npm install
```

### Porta já em uso

Se a porta 4200 já estiver em uso, você pode especificar outra porta:
```bash
# Angular em outra porta
ng serve --port 4300
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

---

Desenvolvido com ❤️ usando Angular 19
