import { IErrorResponse, IFormInputs, IProduct } from '../types/types';
import { baseApi } from '../utils/baseApi';

const GetProducts = 'getProducts';
const CreateProduct = 'createProduct';
const EditProduct = 'editProduct';
const DeleteProduct = 'deleteProduct';

const productsServices = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    [GetProducts]: builder.query<IProduct[], void>({ query: () => '/products' }),
    [CreateProduct]: builder.mutation<IProduct, IFormInputs>({
      query: (data) => ({
        method: 'POST',
        url: '/products',
        body: data,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
    [EditProduct]: builder.mutation<IProduct, { id: number, data: IFormInputs }>({
      query: ({ id, data }) => ({
        method: 'PUT',
        url: '/products/' + id,
        body: data,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
    [DeleteProduct]: builder.mutation<void, number>({
      query: (id) => ({
        method: 'DELETE',
        url: '/products/' + id,
      }),
      transformErrorResponse: (response: IErrorResponse) => `${response.data[0].ErrorMessage}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation
} = productsServices;
