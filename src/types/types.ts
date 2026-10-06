export enum StatusType {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  EMPTY = "EMPTY",
}

export enum SortingType {
  ASC = "asc",
  DESC = "desc",
}

export type Product = {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};
