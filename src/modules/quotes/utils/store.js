import { createStore } from '@utils/store.utils';
import { getRandomPrefetchedQuote } from './api';
import { getRandomLocalQuote } from './quotes.local';
import Settings from './settings';

export const getStateObject = () => {
    const { fetchFromServer, showQuotes } = Settings;
    let quote;

    // if allowed to fetch from server
    // begin with assuming we have a
    // prefetched quote from the api
    if (fetchFromServer) {
        quote = getRandomPrefetchedQuote();
    }

    // fallback to the locally stored quote
    quote = quote || getRandomLocalQuote();

    return { fetchFromServer, showQuotes, quote };
};

export default createStore();;
