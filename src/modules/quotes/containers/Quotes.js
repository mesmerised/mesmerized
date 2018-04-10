import React, { Component } from 'react';
import QuotesComponent from '../components/Quote';
import ConnectedStoreHOC from '../utils/connect.store.hoc';
import * as Actions from '../utils/actions';

class Quotes extends Component {
    componentDidMount() {
        // lazy initialize the state object
        setTimeout(() => Actions.refresh(), 0);
    }

    render() {
        const { showQuotes, quote = {} } = this.props;

        const author  = quote.quoteAuthor || 'Anonymous';
        const text = quote.quoteText;

        if (!showQuotes || !text) return null;

        const props = { author, text };

        return (
            showQuotes && <QuotesComponent { ...props } />
        );
    }
}

export default ConnectedStoreHOC(Quotes);
