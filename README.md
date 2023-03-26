# UNO Backend

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[Documentação](https://documenter.getpostman.com/view/13271893/2s93RMVvtQ)

## Índice

- [Como clonar o repositório](#como-clonar-o-repositório)
- [Criando um arquivo .env](#criando-um-arquivo-env)
- [Instalando dependências](#instalando-dependências)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação de dependências com npm](#instalação-de-dependências-com-npm)
  - [Instalação de dependências com yarn](#instalação-de-dependências-com-yarn)
- [Iniciando o banco de dados com Docker Compose 🐳](#iniciando-o-banco-de-dados-com-docker-compose-)
- [Passo a passo](#passo-a-passo)
- [Contribuidores ✨](#contribuidores-)

## Como clonar o repositório

Para começar, você precisará ter o Git instalado na sua máquina. Você pode baixá-lo [aqui](https://git-scm.com/downloads).

Em seguida, siga os passos abaixo para clonar o repositório:

1. Abra o seu terminal.
2. Navegue até o diretório em que deseja clonar o repositório usando o comando `cd`.
3. Digite o seguinte comando para clonar o repositório:

```
git clone https://github.com/Uno-Online/uno-backend.git
```

Isso irá criar uma cópia do repositório no diretório atual do seu terminal.

4. Se você quiser clonar o repositório para um diretório com um nome diferente, adicione o nome do diretório após o comando `git clone`. Por exemplo:

```
git clone https://github.com/Uno-Online/uno-backend.git nome-do-diretorio
```

Isso irá criar um novo diretório chamado `nome-do-diretorio` e clonar o repositório dentro dele.

5. Agora que você clonou o repositório, você pode trabalhar nele na sua máquina local.

Para atualizar o repositório com as mudanças mais recentes do repositório remoto, use o comando `git pull`. Para enviar suas alterações para o repositório remoto, use o comando `git push`.

Antes de começar a trabalhar no código, é uma boa prática criar uma nova branch para o seu trabalho usando o comando `git checkout -b nome-da-sua-branch`. Isso garantirá que você não está trabalhando na branch principal do repositório e ajudará a organizar o seu trabalho.

Para mais informações sobre o uso do Git, consulte a documentação oficial [aqui](https://git-scm.com/doc).

## Criando um arquivo .env

Crie uma cópia do arquivo `.env.example` com o nome `.env`. Este arquivo contém variáveis de ambiente que serão usadas pela aplicação.

Você pode criar uma cópia do arquivo no terminal, usando o seguinte comando:

```
cp .env.example .env
```

## Criando um arquivo .env

Crie uma cópia do arquivo `.env.example` com o nome `.env`. Este arquivo contém variáveis de ambiente que serão usadas pela aplicação.

Você pode criar uma cópia do arquivo no terminal, usando o seguinte comando:

```
cp .env.example .env
```

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
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rosousa"><img src="https://avatars.githubusercontent.com/u/101147637?v=4?s=100" width="100px;" alt="Rodolfo Sousa"/><br /><sub><b>Rodolfo Sousa</b></sub></a><br /><a href="https://github.com/Uno-Online/uno-backend/commits?author=rosousa" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/adrianoaraujocoelho"><img src="https://avatars.githubusercontent.com/u/80139085?v=4?s=100" width="100px;" alt="Adriano"/><br /><sub><b>Adriano</b></sub></a><br /><a href="https://github.com/Uno-Online/uno-backend/commits?author=adrianoaraujocoelho" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://pedro3g.dev"><img src="https://avatars.githubusercontent.com/u/30221184?v=4?s=100" width="100px;" alt="Pedro Henrique"/><br /><sub><b>Pedro Henrique</b></sub></a><br /><a href="https://github.com/Uno-Online/uno-backend/commits?author=pedro3g" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Esse projeto segue a especificação [@all-contributors](https://github.com/all-contributors/all-contributors). Contribuições de todas as formas são bem vindas!

Por favor, depois de contribuir de qualquer forma, [chame o bot @all-contributors](https://github.com/Uno-Online/uno-backend/pull/41#issuecomment-1481839393) em qualquer issue ou PR e se adicione nesta seção de contribuidores!
