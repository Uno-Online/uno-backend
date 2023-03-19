# UNO Backend

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
