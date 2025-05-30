export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate?: number;
    count: number;
  };
}

export interface IFormInputs {
  id: number;
  title: string;
  description: string;
  category: string;
  count: number;
  price: number;
  image: string;
}

export interface IErrorResponse {
  status: number;
  data: {
    Code: number;
    ErrorMessage: string;
  }[];
}

export interface IUser {
  email: string;
  token: string;
  name: string;
  picture: string;
}
