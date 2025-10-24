# 🌤️ Lumina Indra API

Este projeto é uma API simples desenvolvida em **NestJS** que consulta duas fontes de previsão do tempo para garantir **alta disponibilidade e confiabilidade** dos dados.
O nome *Indra* foi escolhido em referência ao poderoso deus hindu dos céus, relâmpagos e tempestades — símbolo de força, energia e domínio sobre o clima.
A arquitetura segue os princípios de **Clean Architecture**, e inclui boas práticas de **logs, documentação e padronização de commits**.

---

## 🚀 Tecnologias Utilizadas

- **[NestJS](https://nestjs.com/)** – framework Node.js com suporte nativo a TypeScript, modular e escalável.
- **[Pino](https://github.com/pinojs/pino)** e **[pino-http](https://github.com/pinojs/pino-http)** – para geração de logs de alta performance e fácil integração com ferramentas de observabilidade.
- **[Swagger](https://swagger.io/)** – documentação automática disponível em:
  ```
  http://localhost:3000/api-doc
  ```
- **[Husky](https://typicode.github.io/husky/)** + **[Commitlint](https://commitlint.js.org/)** + **[Lint-Staged](https://github.com/okonet/lint-staged)** – para garantir qualidade e padronização nos commits.
- **Clean Architecture** – organização de código em camadas bem definidas (Domain, Application, Infra, Presentation, Shared).

---

## ☁️ APIs de Clima

O sistema utiliza **duas APIs diferentes** para buscar previsões meteorológicas:
1. **OpenWeather** → [https://openweathermap.org/](https://openweathermap.org/)
2. **Visual Crossing** → [https://www.visualcrossing.com/](https://www.visualcrossing.com/)

> 💡 Caso uma das APIs esteja indisponível, o sistema automaticamente consulta a outra — garantindo que sempre haja uma previsão válida para retornar.

---

## 🔐 Configuração do Ambiente

### 1. Criar o arquivo `.env`

Copie o modelo de configuração:
```bash
cp .env.example .env
```

### 2. Obter as chaves de API

#### 🔸 OpenWeather
1. Crie uma conta gratuita em [https://openweathermap.org/](https://openweathermap.org/)
2. Vá em **"My API keys"** no painel do usuário
3. Copie sua **API key**
4. Cole no seu `.env`:
   ```bash
   WEATHER_API_KEY=your_openweather_api_key_here
   ```

#### 🔸 Visual Crossing
1. Crie uma conta em [https://www.visualcrossing.com/](https://www.visualcrossing.com/)
2. Após o login, acesse **Account → API Keys**
3. Copie sua **API key**
4. Cole no seu `.env`:
   ```bash
   VISUAL_CROSSING_API_KEY=your_visual_crossing_api_key_here
   ```

> As URLs base e coordenadas de teste já estão configuradas no `.env.example`.

---

## 💾 Cache e Desempenho

Inicialmente foi considerado o uso de **Redis** para armazenar respostas em cache por até 10 minutos.  
Entretanto, por se tratar de um projeto simples, essa camada foi descartada para manter o código mais direto e didático.

---

## 🧩 Estrutura e Arquitetura

O projeto segue **Clean Architecture**, separando bem as camadas:

```bash
src/
 ├── application/      # Casos de uso e lógica de negócio
 ├── domain/           # Entidades e contratos
 ├── infra/            # Integração com APIs externas, persistência etc.
 ├── presentation/     # Controllers, DTOs e rotas (NestJS)
 └── shared/           # Constants, Interceptors, Utils
```

Essa abordagem facilita testes, manutenção e evolução do código.

---

## 🧠 Convenções e Qualidade de Código

### 1. Husky
O Husky é usado para garantir que todos os commits sigam as convenções definidas e que os testes e o lint sejam executados antes de cada commit.  
O script `prepare` já está configurado no `package.json`, portanto **o Husky será instalado automaticamente** após o comando:

```bash
npm install ou yarn
```

### 2. Commitlint
Valida mensagens de commit conforme o padrão [Conventional Commits](https://www.conventionalcommits.org/).  
Exemplo válido:
```bash
feat: add fallback to Visual Crossing API
```

### 3. Lint-Staged
Executa o lint apenas nos arquivos modificados, garantindo performance e qualidade antes do commit.

---

## 🧭 Executando o Projeto

```bash
# Instalar dependências
npm install ou yarn

# Rodar em modo desenvolvimento
npm run start:dev ou yarn start:dev

# Acessar documentação Swagger
http://localhost:3000/api-docs
```

A porta **3000** é fixa (valor mágico definido para simplificar o desenvolvimento local).

---

## 🧑‍💻 Autor

Desenvolvido por Joel Gonçalves
