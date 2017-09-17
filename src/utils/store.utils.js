// hold all subscriptions
const _subscriptions = new WeakMap();
// hold all state trees
const _states = new WeakMap();

/**
 * Store class to manage state and subscriptions.
 *
 * @example
 *     const store = new Store({value: 1});
 *     const handler = () => console.log('handler invoked');
 *
 *     store.subscribe(handler);
 *     store.state = { value: 2 };
 *     // logs ->
 *     // handler invoked
 *
 *     const log = (...args) => console.log(...args);
 *     store.subscribe(log);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 10
 *     };
 *     // logs ->
 *     // handler invoked
 *     // {value:2, anotherValue: 10}, {value: 2}, store instance
 *
 *     store.unsubscribe(handler);
 *     store.state = {
 *         ...store.state,
 *         anotherValue: 50
 *     };
 *     // logs ->
 *     // {value:2, anotherValue: 50}, {value:2, anotherValue: 10}, store instance
 */
class Store {
    /**
     * Store constructor.
     *
     * @param  {Object} initialState    Initial state
     */
    constructor(initialState = {}) {
        _subscriptions.set(this, []);
        _states.set(this, initialState);
    }

    /**
     * Getter for the state.
     *
     * @return {Object} The current state of the store
     */
    get state() {
        return _states.get(this);
    }

    /**
     * Setter for the store.
     * Also invokes the handlers after setting the state.
     *
     * @param  {Object} newState    Updated state of the store.
     */
    set state(newState) {
        const handlers = _subscriptions.get(this);
        const prevState = _states.get(this);

        // set the new state
        _states.set(this, newState);
        // invoke the registered handlers
        handlers.forEach(h => {
            h(newState, prevState, this);
        });
    }

    /**
     * Add a subscription to the store.
     *
     * @param  {Function} handler   Function to invoke
     * @return {Function}           Function to unsubscribe
     */
    subscribe(handler) {
        if (typeof handler === 'function') {
            const subscriptions = _subscriptions.get(this);
            subscriptions.push(handler);
        }
        // return function to unsubscribe
        return () => this.unsubscribe(handler);
    }

    /**
     * Removes the previously added subscription from the store.
     *
     * @param  {Function} handler   Previously added handler function
     */
    unsubscribe(handler) {
        if (!handler || typeof handler !== 'function' ) return;

        const subscriptions = _subscriptions.get(this);
        const filteredHandlers = subscriptions.filter(s => s !== handler);

        _subscriptions.set(this, filteredHandlers);
    }

    /**
     * Removes all subscriptions from the store.
     */
    unsubscribeAll() {
        _subscriptions.set(this, []);
    }
}

export function createStore(initialState = {}) {
    return new Store(initialState);
}
