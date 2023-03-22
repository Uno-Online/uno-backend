Classe estendida da classe `Error` do javascript para lançamento de exceções HTTP do express.

> A utilização dos métodos de exceção estendidos dessa classe precisam estar de acordo com o contexto utilizado pelo [middleware de erro](https://byefive.atlassian.net/wiki/spaces/BYEFIVE/pages/360675/Middleware+de+tratamento+de+erros). A não utilização ocorrerá em problemas de resposta do servidor.

## Exemplo

Para esse exemplo, será utilizada a classe `BadRequestException` que estende a classe `HttpException`.

```js
class BadRequestException extends HttpException {
  constructor(message) {
    super(message, 400);
  }
}
```

Para disparar essa exceção, basta utiliza-la no controller seguindo a regra que deve ser aplicada para o contexto do middleware de erro:

```js
(request, response) => {
  ...
  throw new BadRequestException('Exception message');
  ...
};
```

## Criação de novas exceções

Como explicado anteriormente, qualquer classe de exceção deve extender a classe base que é a `HttpException`

```js
class NewException extends HttpException {}
```

Após isso, deve-se chamar o método `super` passando a mensagem de exceção e o status da requisição relativo a essa exceção.

```js
class NewException extends HttpException {
  constructor(message) {
    super(message, 200);
  }
}
```

Sendo assim, o super recebendo 2 parâmetros:

1.  A mensagem de erro podendo ser uma string ou um objeto
2.  O status da requisição. Veja mais códigos de status de requisições [aqui](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status).
