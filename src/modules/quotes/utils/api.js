import fetchJsonp from 'fetch-jsonp';
import { toUrl } from '@utils/url.utils';
import * as StorageUtils from '@utils/storage.utils';
import apiConfigs from '../configs/api.config';
import cacheConfigs from '../configs/cache.config';

const randomQuoteApiUrl = apiConfigs.base;
const randomQuoteCacheKey = cacheConfigs.randomQuotes;

// random quotes api defaults
const DEFAULTS = {
    lang: 'en',
    format: 'jsonp',
};

// max quotes to prefetch
const PREFETCH_THRESHOLD = 10;

/**
 * Fetch random quote from the API.
 *
 * @see http://forismatic.com/en/api/ -> getQuote Method
 *
 * @param  {Object} params  Supported parameters
 * @return {Promise}        Promise that returns JSON data (Quote object)
 */
export function fetchRandomQuote(params = {}) {
    params = {...DEFAULTS, ...params};

    const url = toUrl(randomQuoteApiUrl, params);

    return fetchJsonp(url, {jsonpCallback: 'jsonp'})
            .then(response => response.json())
            .catch(response => ({}));
}

/**
 * Fetch and store quotes in the cache
 */
export function prefetchRandomQuote() {
    const prefetchedQuotes = StorageUtils.get(randomQuoteCacheKey);
    const exisitngPrefetchedQuotesCount = prefetchedQuotes
        && Object.keys(prefetchedQuotes).length;

    // if sufficient buffer, do not prefetch
    if (exisitngPrefetchedQuotesCount >= PREFETCH_THRESHOLD) return;

    // call random quote api
    // then store the quote object in the cache
    // { [quote id] : { quote object }, ... }
    fetchRandomQuote().then(quote => {
        if (!quote || !quote.quoteText) return;
        const id = quote.quoteLink;
        StorageUtils.update(randomQuoteCacheKey, {[id]: quote});
    });
}

/**
 * Returns a random prefetched quote object from the cache.
 * The returned quote is removed from the cache.
 *
 * @return {Object}     Quote object as per the API
 */
export function getRandomPrefetchedQuote() {
    const prefetchedQuotes = StorageUtils.get(randomQuoteCacheKey);

    // no pre-fetched photos, return
    if (!prefetchedQuotes || !Object.keys(prefetchedQuotes).length) {
        return;
    }

    // there is at least one unused photo, pick the first one
    const prefetchedQuotesIds = Object.keys(prefetchedQuotes);
    const selectedId = prefetchedQuotesIds[0];
    const unusedQuote = prefetchedQuotes[selectedId];
    // delete from cache and return the photo
    delete prefetchedQuotes[selectedId];
    StorageUtils.set(randomQuoteCacheKey, prefetchedQuotes);
    return unusedQuote;
}
