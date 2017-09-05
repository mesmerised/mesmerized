import React, { Component } from 'react';
import QuotesComponent from '../components/Quote';
import { prefetchRandomQuote, getRandomPrefetchedQuote } from '../api';
import { getRandomLocalQuote } from '../quotes.local';

const quoteObject = getRandomPrefetchedQuote() || getRandomLocalQuote();

class Quotes extends Component {
    componentDidMount() {
        prefetchRandomQuote();
    }

    render() {
        const author  = quoteObject.quoteAuthor || 'Anonymous';
        const text = quoteObject.quoteText;
        const props = { author, text };

        return (
            <QuotesComponent { ...props } />
        );
    }
}

export default Quotes;
