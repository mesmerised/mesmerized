import store, { getStateObject } from './store';
import { prefetchRandomQuote } from './api';

export const refresh = () => {
    const updatedState = getStateObject();
    const { fetchFromServer } = updatedState;
    // prefetch if allowed by settings
    fetchFromServer && prefetchRandomQuote();
    // set the updated state on the store
    store.state = {...store.state, ...updatedState};
}
