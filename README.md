# 🎯 Peixe 30 - Sistema de Gestão de Vagas

Frontend da aplicação de gerenciamento de vagas e candidatos da Peixe 30, um sistema completo para matching inteligente entre vagas e candidatos.

## � Sobre o Projeto

O **Peixe 30** é um sistema web moderno para gestão de vagas de emprego que utiliza algoritmos de matching para conectar candidatos às oportunidades mais compatíveis. O sistema analisa skills, experiência e outros critérios para calcular um score de compatibilidade entre candidatos e vagas.

### 🎯 Principais Funcionalidades

- **Gestão Completa de Vagas**: Criar, editar, visualizar e deletar vagas
- **Matching Inteligente**: Algoritmo que calcula compatibilidade entre candidatos e vagas
- **Sistema de Score**: Classificação visual de candidatos por compatibilidade
- **Convites Automatizados**: Sistema de convites para candidatos qualificados
- **Dashboard Responsivo**: Interface adaptável para desktop e mobile
- **Autenticação Segura**: Sistema de login com JWT
- **Paginação Avançada**: Navegação eficiente entre grandes volumes de dados

## �🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas
- **Lucide React** - Ícones SVG

### Ferramentas de Desenvolvimento
- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processador CSS
- **TypeScript Compiler** - Verificação de tipos

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18 ou superior ([Download aqui](https://nodejs.org/))
- **npm** ou **yarn** (geralmente vem com o Node.js)
- **Git** ([Download aqui](https://git-scm.com/))
- **Backend da aplicação** rodando (veja o README do backend)

## �️ Instalação e Configuração

### 1. Clonando o Repositório

```bash
# Clone o repositório
git clone https://github.com/PhelipeG/frontend-peixe30-sistemas-vagas.git

# Entre na pasta do projeto
cd frontend-peixe30-sistemas-vagas
```

### 2. Instalando Dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. Configuração das Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Ou crie manualmente o arquivo .env.local
```

Edite o arquivo `.env.local` com as seguintes configurações:

```env
# URL da API backend
NEXT_PUBLIC_API_URL=http://localhost:3333/api

# Outras configurações opcionais
NEXT_PUBLIC_APP_NAME=Peixe 30
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 4. Iniciando o Servidor de Desenvolvimento

```bash
# Inicie o servidor
npm run dev

# Ou com yarn
yarn dev
```

A aplicação estará disponível em: **http://localhost:3000**
## 🎯 Como Executar

### Ambiente de Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```
**Acesse:** `http://localhost:3000`

### Build de Produção
```bash
# Gerar build otimizado
npm run build

# Iniciar em modo produção
npm start
```

### Outros Scripts Disponíveis
```bash
# Verificar código com ESLint
npm run lint

# Verificar tipos TypeScript
npm run type-check
```

## 📸 Screenshots do Sistema

### 🔐 Tela de Login
![Tela de Login](public/screenshorts/screen-login.png)
*Interface moderna e responsiva para autenticação de usuários*

### 📋 Listagem de Vagas
![Listagem de Vagas](public/screenshorts/screen-vagas.png)
*Dashboard principal com todas as vagas cadastradas, paginação e ações rápidas*

### ➕ Criar Nova Vaga
![Criar Vaga](public/screenshorts/screen-criar-vaga.png)
*Formulário completo para cadastro de novas oportunidades com validação em tempo real*

### ✏️ Editar Vaga
![Editar Vaga](public/screenshorts/screen-editar-vaga.png)
*Interface de edição com dados pré-preenchidos e validação*

### 🎯 Matching de Candidatos
![Matching de Candidatos](public/screenshorts/screen-match-candidates.png)
*Visualização de candidatos compatíveis com score de matching e sistema de convites*

### 🗑️ Confirmação de Exclusão
![Exclusão de Vaga](public/screenshorts/screen-exclusao-vaga.png)
*Modal de confirmação para ações destrutivas*

## 🎨 Estrutura das Páginas

### 🔐 `/login`
- **Funcionalidade**: Autenticação de usuários
- **Características**:
  - Formulário responsivo com validação
  - Feedback visual de erros
  - Design moderno com componentes shadcn/ui
  - Credenciais padrão para teste

### 📋 `/jobs` (Dashboard Principal)
- **Funcionalidade**: Listagem e gestão de vagas
- **Características**:
  - Grid responsivo de cards de vagas
  - Paginação inteligente (10 vagas por página)
  - Informações completas: título, descrição, localização, salário, skills
  - Ações rápidas: Ver Candidatos, Editar, Deletar
  - Botão destacado para criar nova vaga

### ➕ `/jobs/new`
- **Funcionalidade**: Criação de novas vagas
- **Características**:
  - Formulário com validação em tempo real
  - Gerenciamento dinâmico de skills
  - Feedback visual de erros e sucessos
  - Design responsivo para todos os dispositivos

### ✏️ `/jobs/[id]/edit`
- **Funcionalidade**: Edição de vagas existentes
- **Características**:
  - Formulário pré-preenchido com dados atuais
  - Mesma validação robusta da criação
  - Preservação de dados durante navegação

### 🎯 `/jobs/[id]/candidates`
- **Funcionalidade**: Visualização de candidatos compatíveis
- **Características**:
  - Lista ordenada por score de compatibilidade
  - Informações detalhadas da vaga no cabeçalho
  - Estatísticas em tempo real (total, score médio, convidados)
  - Cards de candidatos com indicadores visuais de score
  - Sistema de convites com controle de estado
  - Design responsivo com grid adaptativo


## 🌐 Integração com API

### � Endpoints Utilizados

```typescript
// 🔐 Autenticação
POST /api/auth/login        // Login do usuário
GET  /api/auth/me          // Dados do usuário logado

// 💼 Gestão de Vagas
GET    /api/jobs/all       // Listar vagas (com paginação)
POST   /api/jobs           // Criar nova vaga
GET    /api/jobs/:id       // Obter vaga específica
PUT    /api/jobs/:id       // Atualizar vaga
DELETE /api/jobs/deleteJob/:id // Deletar vaga

// 👥 Candidatos e Matching
GET  /api/candidates/jobs/:jobId/getMatchingCandidates // Candidatos compatíveis
POST /api/candidates/invitations                       // Enviar convite
```

### 📊 Estrutura de Dados

```typescript
// Tipo da Vaga
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

// Tipo do Candidato
interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: number;
  score: number;        // Score de compatibilidade (0-100)
  invited: boolean;     // Se já foi convidado
  location: string;
}
```

## 📊 Sistema de Score de Compatibilidade

O frontend exibe o score calculado pelo backend com indicadores visuais intuitivos:

| Score | Cor | Badge | Descrição |
|-------|-----|-------|-----------|
| **80-100** | 🟢 Verde | "Excelente Match" | Candidato altamente compatível |
| **60-79** | 🔵 Azul | "Bom Match" | Candidato bem compatível |
| **40-59** | 🟡 Amarelo | "Match Moderado" | Candidato moderadamente compatível |
| **0-39** | ⚪ Cinza | "Match Baixo" | Candidato pouco compatível |

### 🧮 Critérios de Avaliação (Calculados no Backend)
- **Skills Match**: Compatibilidade entre skills da vaga e do candidato
- **Experiência**: Nível de experiência adequado para a posição
- **Localização**: Proximidade geográfica (quando aplicável)
- **Histórico**: Desempenho em posições similares

## 🔐 Credenciais de Acesso

Para testar a aplicação, utilize as credenciais padrão:

```
📧 Email: admin@peixe30.com
🔑 Senha: admin123
```

## 🐛 Tratamento de Erros e UX

### 🔔 Sistema de Notificações
- **Toast notifications** para feedback imediato ao usuário
- **Mensagens de sucesso** para ações completadas
- **Alertas de erro** com descrições claras

### ✅ Validação de Formulários
- **Validação em tempo real** com Zod e React Hook Form
- **Feedback visual** em campos com erro
- **Mensagens específicas** para cada tipo de erro

### 🔄 Estados de Loading
- **Spinners** durante carregamento de dados
- **Botões desabilitados** durante submissão
- **Skeletons** para melhor percepção de performance

### 🚨 Fallbacks
- **Páginas de erro** personalizadas
- **Estados vazios** com orientações claras
- **Retry automático** para falhas temporárias

## 🧪 Como Testar a Aplicação

### 1. Preparação do Ambiente
```bash
# Certifique-se de que o backend está rodando
# Inicie o frontend
npm run dev
```

### 2. Fluxo de Teste Completo

#### 🔐 **Autenticação**
1. Acesse `http://localhost:3000`
2. Faça login com: `admin@peixe30.com` / `admin123`
3. Verifique redirecionamento para dashboard

#### 💼 **Gestão de Vagas**
1. **Listar vagas**: Veja todas as vagas no dashboard
2. **Criar vaga**: 
   - Clique em "Nova Vaga"
   - Preencha todos os campos
   - Adicione skills dinamicamente
   - Submeta o formulário
3. **Editar vaga**:
   - Clique em "Editar" em qualquer vaga
   - Modifique campos
   - Salve as alterações
4. **Deletar vaga**:
   - Clique em "Deletar"
   - Confirme a exclusão no modal

#### 🎯 **Matching de Candidatos**
1. **Ver candidatos**: Clique em "Ver Candidatos" em uma vaga
2. **Analisar scores**: Observe os badges de compatibilidade
3. **Enviar convites**: Clique em "Convidar" para candidatos não convidados
4. **Verificar estatísticas**: Veja métricas no topo da página

#### 📱 **Responsividade**
1. Teste em diferentes tamanhos de tela
2. Verifique navegação mobile
3. Teste formulários em dispositivos móveis

#### 🔄 **Funcionalidades Extras**
1. **Paginação**: Navegue entre páginas de vagas
2. **Logout**: Saia do sistema pelo header
3. **Navegação**: Use breadcrumbs e botões de voltar

### 3. Cenários de Teste

| Cenário | Entrada | Resultado Esperado |
|---------|---------|-------------------|
| Login válido | Credenciais corretas | Redirecionamento para /jobs |
| Login inválido | Credenciais incorretas | Mensagem de erro |
| Criar vaga | Dados válidos | Vaga criada com sucesso |
| Campo obrigatório | Campo vazio | Erro de validação |
| Editar vaga | Modificação de dados | Vaga atualizada |
| Deletar vaga | Confirmação | Vaga removida da lista |
| Ver candidatos | Vaga com candidatos | Lista ordenada por score |
| Convidar candidato | Candidato não convidado | Convite enviado |

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   │   └── login/         # Página de login
│   ├── (dashboard)/       # Grupo de rotas do dashboard
│   │   ├── jobs/          # Páginas de vagas
│   │   └── layout.tsx     # Layout do dashboard
│   ├── globals.css        # Estilos globais
│   └── layout.tsx         # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── auth/             # Componentes de autenticação
│   ├── candidates/       # Componentes de candidatos
│   ├── jobs/             # Componentes de vagas
│   ├── shared/           # Componentes compartilhados
│   └── ui/               # Componentes base (shadcn/ui)
├── contexts/             # Contextos React
├── hooks/                # Hooks customizados
├── lib/                  # Utilitários e configurações
├── types/                # Definições de tipos TypeScript
└── validation-schemas/   # Esquemas de validação Zod
```

## � Deploy e Produção

### Variáveis de Ambiente para Produção
```env
NEXT_PUBLIC_API_URL=https://sua-api-producao.com/api
NEXT_PUBLIC_APP_NAME=Peixe 30
NODE_ENV=production
```

### Build Otimizado
```bash
# Gerar build de produção
npm run build

# Verificar build localmente
npm start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- **Desenvolvedor**: Phelipe G
- **Repositório**: [GitHub](https://github.com/PhelipeG/frontend-peixe30-sistemas-vagas)
- **Issues**: [Reportar problemas](https://github.com/PhelipeG/frontend-peixe30-sistemas-vagas/issues)

## 📋 Checklist de Funcionalidades

- [x] ✅ Sistema de autenticação JWT
- [x] ✅ Dashboard responsivo
- [x] ✅ CRUD completo de vagas
- [x] ✅ Sistema de matching com score visual
- [x] ✅ Paginação de resultados
- [x] ✅ Validação de formulários
- [x] ✅ Tratamento de erros
- [x] ✅ Design system com shadcn/ui
- [x] ✅ Typescript em 100% do código
- [x] ✅ Layout responsivo mobile-first
- [x] ✅ Sistema de notificações
- [x] ✅ Estados de loading
- [x] ✅ Componentização modular

## �📄 Licença

Este projeto foi desenvolvido como teste técnico para a **Peixe 30 Sistemas**.

---

<div align="center">

**🐟 Peixe 30 - Conectando talentos às melhores oportunidades**

*Desenvolvido com ❤️ usando Next.js e TypeScript*

</div>