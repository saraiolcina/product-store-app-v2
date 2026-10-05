import { useState, useEffect, useRef } from "react";

type UseCategoriesReturnType = {
  categories: string[];
};

export const useGetCategories = (): UseCategoriesReturnType => {
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
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;

      console.error(`An error occurred: ${error}`);
    }
  };

  useEffect(() => {
    fetchCategories();
    return () => fetchCategoriesControllerRef.current?.abort();
  }, []);

  return { categories };
};
