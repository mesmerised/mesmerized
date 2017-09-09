/**
 * Get a random integer between the given integers.
 * The minimum is inclusive and the maximum is exclusive.
 * 0, 6 -> would give random min 0 and max 5
 *
 * @param  {Number} min     Min (inclusive)
 * @param  {Number} max     Max (exclusive)
 * @return {Number}         Random Integer
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Pads the given number with a preceding `0`.
 *
 * @example
 *     padNumber(5) -> 05
 *     padNumber(5, 2) -> 05
 *     padNumber(5, 3) -> 005
 *     padNumber(5, 1) -> 5
 *
 * @param  {Number} num         Number to pad
 * @param  {Number} [size=2]    Total length
 * @return {String}             Padded number string
 */
export function padNumber(num, size = 2) {
    let s = String(num);
    while (s.length < size) s = `0${s}`;
    return s;
}
