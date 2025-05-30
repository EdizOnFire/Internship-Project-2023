import { rest } from 'msw';

import products from './products-mock.json';

const inventory = [
  rest.get(`https://fakestoreapi.com/products`, (_, res, ctx) => {
    return res(ctx.json(products));
  }),

  rest.post(`https://fakestoreapi.com/products`, (req, res, ctx) => {
    const product = { id: '1', ...req.params };
    return res(ctx.json({ data: product }));
  }),
];

export default inventory;