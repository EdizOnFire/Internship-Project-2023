import inventory from './inventory-mock.ts';
import marketplace from './marketplace-mock.ts';

const handlers = [
    ...marketplace,
    ...inventory,
];

export default handlers;