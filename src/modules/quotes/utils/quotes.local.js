import { getRandomInt } from '@utils/general.utils';
import LocalQuotes from './quotes.local.json';

const localQuotesLength = LocalQuotes.length;

export function getRandomLocalQuote() {
    return LocalQuotes[getRandomInt(0, localQuotesLength)];
}
