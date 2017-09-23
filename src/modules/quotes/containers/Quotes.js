import React, { Component } from 'react';
import QuotesComponent from '../components/Quote';
import { prefetchRandomQuote } from '../utils/api';
import ConnectedStoreHOC from '../utils/connect.store.hoc';

class Quotes extends Component {
    componentDidMount() {
        const { fetchFromServer } = this.props;
        fetchFromServer && prefetchRandomQuote();
    }

    render() {
        const { showQuotes, quote = {} } = this.props;

        const author  = quote.quoteAuthor || 'Anonymous';
        const text = quote.quoteText;
        const props = { author, text };

        return (
            showQuotes && <QuotesComponent { ...props } />
        );
    }
}

export default ConnectedStoreHOC(Quotes);
