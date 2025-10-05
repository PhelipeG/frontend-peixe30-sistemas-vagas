# Peixe 30 - Frontend

Frontend da aplicação de gerenciamento de vagas e candidatos da Peixe 30.

## 🚀 Tecnologias

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** - Componentes
- **React Hook Form** + **Zod** - Formulários e validação
- **Axios** - Cliente HTTP
- **date-fns** - Manipulação de datas

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend rodando (veja README do backend)

## 🔧 Instalação

1. Entre na pasta do frontend:
```bash
cd peixe30-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Edite o arquivo `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api
```

## 🎯 Como executar

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Produção
```bash
npm run build
npm start
```

### ✅ Candidatos
- Visualizar candidatos ordenados por score de compatibilidade
- Score visual com cores (verde, azul, amarelo, cinza)
- Convidar candidatos para vagas
- Controle de convites já enviados

## 🎨 Páginas

### `/login`
- Página de autenticação
- Formulário com validação
- Feedback de erros
- Design moderno e responsivo

### `/jobs`
- Lista paginada de vagas (9 por página)
- Cards informativos com título, descrição, localização, salário e skills
- Ações: Ver Match, Editar, Deletar
- Botão para criar nova vaga

### `/jobs/new`
- Formulário de criação de vaga
- Validação em tempo real
- Adicionar/remover skills dinamicamente
- Feedback visual de erros

### `/jobs/[id]/edit`
- Formulário de edição de vaga
- Pré-preenchido com dados atuais
- Mesma validação da criação

### `/jobs/[id]/candidates`
- Lista de candidatos compatíveis ordenados por score
- Informações da vaga no topo
- Estatísticas (total de candidatos, score médio, convidados)
- Cards de candidatos com score visual
- Botão para convidar (desabilitado se já convidado)


## 🔄 Fluxo da Aplicação

```
1. Usuário acessa / → Redirect para /jobs
2. Se não autenticado → Redirect para /login
3. Faz login → Token salvo → Redirect para /jobs
4. Lista vagas com paginação
5. Pode criar/editar/deletar vagas
6. Clica em "Ver Match" → Página de candidatos
7. Visualiza candidatos ordenados por score
8. Convida candidatos
9. Logout → Volta para /login
```

## 📊 Cálculo do Score (Frontend)

O frontend apenas exibe o score calculado pelo backend, com indicadores visuais:

- **80-100:** 🟢 Verde - "Excelente Match"
- **60-79:** 🔵 Azul - "Bom Match"
- **40-59:** 🟡 Amarelo - "Match Moderado"
- **0-39:** ⚪ Cinza - "Match Baixo"

## 🌐 Integração com API

### Endpoints Utilizados

```typescript
// Auth
POST /api/auth/login
GET /api/auth/me

// Jobs
GET /api/jobs?page=1&limit=9
POST /api/jobs
GET /api/jobs/:id
PUT /api/jobs/:id
DELETE /api/jobs/:id

// Candidates
GET /api/jobs/:jobId/candidates
POST /api/invitations
```

### Build Manual
```bash
npm run build
npm start
```

## 🔐 Credenciais de Acesso

**Email:** admin@peixe30.com  
**Senha:** admin123


## 🐛 Tratamento de Erros

- Toast notifications para feedback ao usuário
- Validação de formulários em tempo real
- Mensagens de erro amigáveis
- Fallbacks para loading e erros

## 📝 Boas Práticas Implementadas

✅ TypeScript estrito  
✅ Componentes reutilizáveis  
✅ Separação de responsabilidades  
✅ Validação de dados (Zod)  
✅ Tratamento de erros  
✅ Loading states  
✅ Feedback visual  
✅ Código limpo e comentado  
✅ Commits semânticos  

## 🎓 Como Testar

1. Inicie o backend
2. Inicie o frontend
3. Acesse http://localhost:3000
4. Faça login com as credenciais padrão
5. Teste as funcionalidades:
   - Listar vagas
   - Criar nova vaga
   - Editar vaga existente
   - Deletar vaga
   - Ver candidatos compatíveis
   - Convidar candidatos
   - Paginação
   - Logout

## 📄 Licença

Este projeto foi desenvolvido como teste técnico para a Peixe 30.