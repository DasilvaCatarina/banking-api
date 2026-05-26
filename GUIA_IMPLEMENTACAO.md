# 🚀 Guia de Implementação — GitHub Profile Catarina Silva

Segue estes passos para publicar tudo no GitHub.

---

## PASSO 1 — Profile README (Quick Win — faz primeiro!)

```bash
# Criar o repositório especial no GitHub
# Vai a github.com → New Repository → nome: DasilvaCatarina (igual ao teu username)
# Marca "Add a README file" → Create repository

# Depois, no terminal:
cd ~/Desktop
git clone https://github.com/DasilvaCatarina/DasilvaCatarina.git
cp /caminho/para/profile-readme/README.md DasilvaCatarina/README.md
cd DasilvaCatarina
git add README.md
git commit -m "feat: add professional profile README"
git push origin main
```

✅ Resultado: o teu perfil github.com/DasilvaCatarina mostra agora o mini-CV visual.

---

## PASSO 2 — Projeto Java Banking API

```bash
# Criar repositório no GitHub: banking-api (público)
cd ~/Desktop
mkdir banking-api && cd banking-api
git init
git remote add origin https://github.com/DasilvaCatarina/banking-api.git

# Copiar todos os ficheiros
cp -r /caminho/para/java-banking-api/* .

# Commit inicial
git add .
git commit -m "feat: initial banking REST API with Spring Boot

- CRUD de contas bancárias (Account)
- Depósitos, levantamentos e transferências (Transaction)
- Arquitetura MVC com DTOs e Service layer
- Testes unitários com JUnit 5 + Mockito
- Documentação Swagger (SpringDoc OpenAPI)
- Base de dados H2 para desenvolvimento"

git branch -M main
git push -u origin main
```

---

## PASSO 3 — Projeto Financial Dashboard

```bash
# Criar repositório no GitHub: financial-dashboard (público)
cd ~/Desktop
mkdir financial-dashboard && cd financial-dashboard
git init
git remote add origin https://github.com/DasilvaCatarina/financial-dashboard.git

# Copiar todos os ficheiros
cp -r /caminho/para/financial-dashboard/* .

# Criar .gitignore
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
build/
dist/
.DS_Store
EOF

git add .
git commit -m "feat: financial dashboard full-stack app

- Front-end React com Recharts (pie, line charts)
- Back-end Node.js/Express REST API
- Schema SQL PostgreSQL com views e índices
- Dashboard com resumo mensal, tendências e categorias
- Filtros por período, tipo e categoria"

git branch -M main
git push -u origin main
```

---

## PASSO 4 — Adicionar READMEs aos repositórios existentes

Para cada um dos teus 6 repositórios atuais, cria um README.md com:

```markdown
# Nome do Projeto

Breve descrição do que faz.

## Tecnologias
- Lista de tecnologias

## Como executar
```bash
# comandos
```

## O que aprendi
- Descreve 2-3 aprendizagens concretas
```

---

## ✅ Checklist Final

- [ ] Profile README visível em github.com/DasilvaCatarina
- [ ] Repositório `banking-api` com README + código Java
- [ ] Repositório `financial-dashboard` com README + código full-stack
- [ ] READMEs adicionados aos repositórios existentes
- [ ] Perfil do GitHub com foto, bio e link para LinkedIn

---

## 💡 Dicas Extra

**Bio do perfil GitHub** (Settings → Profile):
> "Desenvolvedora de Software · Java · React · Focada em Fintech & Banca 🏦 | Em busca de oportunidades júnior"

**Pinned Repositories** — Vai ao teu perfil → "Customize your pins" e coloca em destaque:
1. banking-api
2. financial-dashboard
