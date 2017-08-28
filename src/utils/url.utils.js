/**
 * Converts an object representation into
 * query string that can be used in urls.
 * { key1: val1, key2: val2 } -> `key1=val1&key2=val2`
 *
 * @param  {Object} obj     Object to convert
 * @return {String}         Query string
 */
export function toQueryString(obj) {
    return (
        Object.keys(obj).map( k => {
            const v = obj[k];
            if (Array.isArray(v)) {
                return (v.map(av => `${k}[]=${av}`)).join('&');
            } else {
                return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
            }
        })
    ).join('&');
}

/**
 * Creates a url with the given url and params object.
 * 'https://example.com', { key : val }
 *     -> 'https://example.com?key=val'
 *
 * @param  {String} url     The url
 * @param  {Object} params  Query params
 * @return {String}         Complete url
 */
export function toUrl(url = '', params = {}) {
    const q = toQueryString(params);
    const urlBuffer = [url];
    if (q) {
        urlBuffer.push(/\?.+$/.test(url) ? `&${q}` : `?${q}`);
    }
    return urlBuffer.join('');
}
