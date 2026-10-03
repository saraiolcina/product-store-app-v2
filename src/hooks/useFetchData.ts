import { useState, useCallback, useRef } from "react";

import { type Product, ProductResponse, StatusType } from "../types/types";

type UseFetchDataReturnType = {
  status: StatusType;
  products: Product[];
  totalProducts: number;
  fetchData: (skipItems: number) => Promise<void>;
};

export const useFetchData = (): UseFetchDataReturnType => {
  const [status, setStatus] = useState<StatusType>(StatusType.INITIAL);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData: (skipItems: number) => Promise<void> = useCallback(
    async (skipItems: number) => {
      const limit: number = 4;
      const url: string = `https://dummyjson.com/products?limit=${limit}&skip=${skipItems}`;

      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        setStatus(StatusType.LOADING);
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          setStatus(StatusType.ERROR);
          throw new Error(`An error occurred: ${response.status}`);
        }

        const data: ProductResponse = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
        setStatus(StatusType.SUCCESS);
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
