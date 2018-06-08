import { createStorage } from 'persistme';

const MesmerizedStorage = createStorage('mesmerized');

export default MesmerizedStorage;
export const set = (...args) => MesmerizedStorage.set(...args);
export const get = (...args) => MesmerizedStorage.get(...args);
export const update = (...args) => MesmerizedStorage.update(...args);
export const remove = (...args) => MesmerizedStorage.remove(...args);
