import React, { Component } from 'react';
import QuotesComponent from '../components/Quote';
import { prefetchRandomQuote, getRandomPrefetchedQuote } from '../api';
import { getRandomLocalQuote } from '../quotes.local';
import Settings from '../settings';

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
    componentDidMount() {
        Settings.fetchFromServer && prefetchRandomQuote();
    }

    render() {
        const author  = quoteObject.quoteAuthor || 'Anonymous';
        const text = quoteObject.quoteText;
        const props = { author, text };

        return (
            Settings.showQuotes && <QuotesComponent { ...props } />
        );
    }
}

export default Quotes;
