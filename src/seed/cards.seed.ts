import { CardColor, CardSymbol, Prisma } from '@prisma/client';
import {
  COLOR_CHANGING_CARDS_IN_DECK,
  DRAW_FOUR_CARDS_IN_DECK,
  SPECIAL_CARDS_PER_COLOR,
} from '../constants';
import { logger } from '../logger';
import { prisma } from '../prisma';

const createSymbolCardList = (
  length: number,
  color: CardColor,
  symbol: CardSymbol
) => new Array(length).fill(undefined).map(() => ({ color, symbol }));

const specialColoredSymbols = [
  CardSymbol.DRAW_TWO,
  CardSymbol.REVERSE,
  CardSymbol.SKIP,
];

const cards = Object.values(CardColor).reduce<Prisma.CardCreateManyInput[]>(
  (prev, next) => {
    if (next !== 'WILDCARD') {
      const coloredCards = new Array(10).fill(undefined).flatMap((_, index) => {
        if (index === 0)
          return [{ color: next, number: index, symbol: CardSymbol.NUMERIC }];

        return [
          { color: next, number: index, symbol: CardSymbol.NUMERIC },
          { color: next, number: index, symbol: CardSymbol.NUMERIC },
        ];
      });

      return [
        ...prev,
        ...coloredCards,
        ...specialColoredSymbols.flatMap((symbol) =>
          createSymbolCardList(SPECIAL_CARDS_PER_COLOR, next, symbol)
        ),
      ];
    }

    return [
      ...prev,
      ...createSymbolCardList(
        DRAW_FOUR_CARDS_IN_DECK,
        next,
        CardSymbol.DRAW_FOUR
      ),
      ...createSymbolCardList(
        COLOR_CHANGING_CARDS_IN_DECK,
        next,
        CardSymbol.COLOR_CHANGING
      ),
    ];
  },
  []
);

/**
 * Gera todas as 108 cartas do Uno
 * */
async function main() {
  await prisma.$transaction(async (tx) => {
    logger.info('Apagando todas as cartas existentes...');
    await tx.card.deleteMany();

    logger.info('Criando novas cartas...');
    await tx.card.createMany({
      data: cards,
    });
    logger.info(`Criadas ${cards.length} novas cartas.`);
  });
}

main();
