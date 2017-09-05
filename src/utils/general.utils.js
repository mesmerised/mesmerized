/**
 * Get a random integer between the given integers.
 * The minimum is inclusive and the maximum is exclusive.
 * 0, 6 -> would give random min 0 and max 5
 *
 * @todo: move to a common utils
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
