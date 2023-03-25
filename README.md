# UNO Backend
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[Documentação](https://documenter.getpostman.com/view/13271893/2s93RMVvtQ)

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

Basta rodar:

```
npm install
```

Ou, com `yarn`:

```
yarn
```

## Semeando o banco

Para criar as 108 cartas base do jogo, você deve semear o banco de dados.
Basta rodar:

```
yarn seed
```

Você verá algo como:

```
yarn run v1.22.19
$ ts-node src/seed/cards.seed.ts
[01:02:11.576] INFO (64672): Apagando todas as cartas existentes...
[01:02:11.611] INFO (64672): Criando novas cartas...
[01:02:11.620] INFO (64672): Criadas 108 novas cartas.
✨  Done in 0.97s.
```

## Contribuindo com o projeto

...


<<<<<<< HEAD
=======
## Contribuindo com o projeto

...

>>>>>>> ee83c28 (merging readme)
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
