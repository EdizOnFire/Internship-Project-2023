import { rest } from 'msw';

import products from './products-mock.json';

const marketplace = [
  rest.get(`https://fakestoreapi.com/products`, (_, res, ctx) => {
    return res(ctx.json(products));
  }),
];

export default marketplace;