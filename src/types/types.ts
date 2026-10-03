export enum StatusType {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};
