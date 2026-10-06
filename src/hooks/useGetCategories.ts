import { useState, useEffect, useRef } from "react";

import { StatusType } from "../types/types";

type UseCategoriesReturnType = {
  categories: string[];
  categoriesStatus: StatusType;
  fetchCategories: () => Promise<void>;
};

export const useGetCategories = (): UseCategoriesReturnType => {
  const [categoriesStatus, setCategoriesStatus] = useState<StatusType>(
    StatusType.INITIAL
  );
  const [categories, setCategories] = useState<string[]>([]);
  const fetchCategoriesControllerRef = useRef<AbortController | null>(null);

  const fetchCategories = async (): Promise<void> => {
    const url: string = "https://dummyjson.com/products/category-list";

    fetchCategoriesControllerRef.current?.abort();
    const controller = new AbortController();
    fetchCategoriesControllerRef.current = controller;

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data);
      setCategoriesStatus(StatusType.SUCCESS);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      console.error(`An error occurred: ${error}`);
      setCategoriesStatus(StatusType.ERROR);
    }
  };

  useEffect(() => {
    fetchCategories();
    return () => fetchCategoriesControllerRef.current?.abort();
  }, []);

  return { categories, categoriesStatus, fetchCategories };
};
