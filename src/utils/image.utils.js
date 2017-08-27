/**
 * Pre-fetch an image source with a simple promise interface.
 * Supports optional timeout for rejection.
 *
 * @param  {String} src         Image Source
 * @param  {Number} [timeout]   Optional timeout in milliseconds
 * @return {Promise} Promise that resolves on successful image load
 */
export function prefetch(src, timeout) {
    let resolve, reject;
    const promise = new Promise((...args) => [resolve, reject] = args);

    let isNotHandled = true;
    let timeoutID;
    const setHandled = () => {
        isNotHandled = false;
        clearTimeout(timeoutID);
    };

    // image object with load and error handlers
    const img = new Image();
    img.src = src;
    img.onload = () => {
        isNotHandled && resolve(img);
        setHandled();
    };
    img.onerror = () => {
        isNotHandled && reject(img);
        setHandled();
    };

    // set a timeout to reject after specified milliseconds
    if (Number.isInteger(timeout)) {
        timeoutID = setTimeout(() => {
            isNotHandled && reject(img);
            setHandled();
        }, timeout);
    }

    return promise;
}
