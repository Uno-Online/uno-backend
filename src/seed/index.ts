import { logger } from '../logger';
import createCardsSeed from './cards.seed';

async function runSeeds() {
  logger.info('Executando seeds...');
  await createCardsSeed();
  logger.info('Seeds executados com sucesso.');
}

runSeeds();
