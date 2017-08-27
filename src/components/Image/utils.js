export function imagePrefetch(src) {
    let resolve, reject;
    const promise = new Promise((...args) => [resolve, reject] = args);

    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);

    return promise;
}
