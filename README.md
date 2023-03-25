# UNO Backend

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Discord](https://img.shields.io/badge/-Discord-7289DA?logo=discord&logoColor=ffffff&style=flat-square)](https://discord.gg/7wqrRq53)

## Conteúdo

- [Instalando dependências](#instalando-dependências)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação de dependências com npm](#instalação-de-dependências-com-npm)
  - [Instalação de dependências com yarn](#instalação-de-dependências-com-yarn)
- [Iniciando o banco de dados com Docker Compose 🐳](#iniciando-o-banco-de-dados-com-docker-compose-)
  - [Passo a passo](#passo-a-passo)
- [Contribuindo com o projeto](#contribuindo-com-o-projeto)
- [Contribuidores ✨](#contribuidores-)

## Instalando dependências

### Pré-requisitos

Antes de instalar as dependências, você precisa ter o Node.js instalado em sua máquina. Você pode baixar a versão mais recente do Node.js em [https://nodejs.org](https://nodejs.org).

### Instalação de dependências com npm

Para instalar as dependências de um projeto usando o npm, abra um terminal na pasta raiz do projeto e execute o seguinte comando:

```
npm install
```

Este comando irá instalar todas as dependências listadas no arquivo `package.json` na pasta `node_modules`.

### Instalação de dependências com yarn

Para instalar as dependências de um projeto usando o yarn, abra um terminal na pasta raiz do projeto e execute o seguinte comando:

```
yarn
```

Este comando irá instalar todas as dependências listadas no arquivo `package.json` na pasta `node_modules`.

## Iniciando o banco de dados com Docker Compose 🐳

Para iniciar o MySQL com o Docker Compose, é necessário ter o Docker instalado na máquina. Se você não tem o Docker instalado, siga as instruções de instalação em [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/).

### Passo a passo

Abra um terminal na raiz do projeto, onde o arquivo `docker-compose.yml` está localizado.

Execute o seguinte comando para iniciar o serviço:

```
docker-compose up -d prisma
```

Este comando irá iniciar o serviço de instalação do MySQL em background.

Quando o comando termminar, você pode verificar se o banco de dados está em execução:

```
docker ps
```

Este comando irá exibir todos os contêineres em execução. O contêiner do MySQL deve estar listado.

## Contribuindo com o projeto

...

## Contribuidores ✨

Muito obrigado a todas essas pessoas maravilhosas! ([emojis?](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fell-lucas"><img src="https://avatars.githubusercontent.com/u/47724710?v=4?s=100" width="100px;" alt="Lucas Fell"/><br /><sub><b>Lucas Fell</b></sub></a><br /><a href="#infra-fell-lucas" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-fell-lucas" title="Maintenance">🚧</a> <a href="#tool-fell-lucas" title="Tools">🔧</a> <a href="https://github.com/Uno-Online/uno-backend/pulls?q=is%3Apr+reviewed-by%3Afell-lucas" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/deyvis0n"><img src="https://avatars.githubusercontent.com/u/82903398?v=4?s=100" width="100px;" alt="deyvis0n"/><br /><sub><b>deyvis0n</b></sub></a><br /><a href="https://github.com/Uno-Online/uno-backend/commits?author=deyvis0n" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kaolhou.dev"><img src="https://avatars.githubusercontent.com/u/71137653?v=4?s=100" width="100px;" alt="André Mendes da Rocha"/><br /><sub><b>André Mendes da Rocha</b></sub></a><br /><a href="https://github.com/Uno-Online/uno-backend/commits?author=Kaolhou" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Esse projeto segue a especificação [@all-contributors](https://github.com/all-contributors/all-contributors). Contribuições de todas as formas são bem vindas!

Por favor, depois de contribuir de qualquer forma, [chame o bot @all-contributors](https://github.com/Uno-Online/uno-backend/pull/41#issuecomment-1481839393) em qualquer issue ou PR e se adicione nesta seção de contribuidores!
