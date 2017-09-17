import React, { Component } from 'react';
import QuotesComponent from '../components/Quote';
import { prefetchRandomQuote, getRandomPrefetchedQuote } from '../utils/api';
import { getRandomLocalQuote } from '../utils/quotes.local';
import Settings from '../utils/settings';

let quoteObject;

// if allowed to fetch from server
// begin with assuming we have a
// prefetched quote from the api
if (Settings.fetchFromServer) {
    quoteObject = getRandomPrefetchedQuote();
}

// fallback to the locally stored quote
quoteObject = quoteObject || getRandomLocalQuote();

class Quotes extends Component {
    state = {
        fetchFromServer: Settings.fetchFromServer,
        showQuotes: Settings.showQuotes,
        quote: quoteObject,
    };

    componentDidMount() {
        const { fetchFromServer } = this.state;
        fetchFromServer && prefetchRandomQuote();
    }

    render() {
        const { showQuotes, quote = {} } = this.state;

        const author  = quote.quoteAuthor || 'Anonymous';
        const text = quote.quoteText;
        const props = { author, text };

        return (
            showQuotes && <QuotesComponent { ...props } />
        );
    }
}

export default Quotes;
