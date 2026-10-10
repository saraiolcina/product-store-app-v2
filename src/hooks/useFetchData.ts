import { useState, useCallback, useRef } from "react";

import {
  type Product,
  type ProductResponse,
  StatusType,
  SortingType,
} from "../types/types";

type UseFetchDataReturnType = {
  status: StatusType;
  products: Product[];
  totalProducts: number;
  fetchData: (
    limitItems: number,
    skipItems: number,
    orderToSort: SortingType,
    category?: string,
    searchValue?: string
  ) => Promise<void>;
};

export const useFetchData = (): UseFetchDataReturnType => {
  const [status, setStatus] = useState<StatusType>(StatusType.INITIAL);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData: (
    limitItems: number,
    skipItems: number,
    orderToSort: SortingType,
    category?: string,
    searchValue?: string
  ) => Promise<void> = useCallback(
    async (limitItems, skipItems, orderToSort, category, searchValue) => {
      const baseUrl = "https://dummyjson.com/products";
      const sortBy: string = "price";
      const params = new URLSearchParams({
        limit: String(limitItems),
        skip: String(skipItems),
        sortBy,
        order: orderToSort,
      });

      const url = category
        ? `${baseUrl}/category/${category}?${params}`
        : `${baseUrl}/search?${new URLSearchParams({
            q: searchValue ?? "",
          })}&${params}`;

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        setStatus(StatusType.LOADING);
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }

        const data: ProductResponse = await response.json();

        if (data.products.length === 0) {
          setStatus(StatusType.EMPTY);
        } else {
          setProducts(data.products);
          setTotalProducts(data.total);
          setStatus(StatusType.SUCCESS);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;

        setStatus(StatusType.ERROR);
        console.error(`An error occurred: ${error}`);
      }
    },
    []
  );

  return {
    status,
    products,
    totalProducts,
    fetchData,
  };
};
