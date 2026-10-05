import { useState, useEffect, type ReactElement } from "react";

import { useFetchData } from "../hooks/useFetchData";

import { Pagination } from "../components/Pagination";
import { ProductList } from "../components/ProductList";
import { ErrorComponent } from "../components/ErrorComponent";
import { LoadingComponent } from "../components/LoadingComponent";
import { Header } from "../components/HeaderComponent";

import { StatusType, SortingType } from "../types/types";

export const MainView = (): ReactElement => {
  const { status, products, totalProducts, fetchData } = useFetchData();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const limitItems: number = 4;
  const skipItems: number = (currentPage - 1) * limitItems;
  const [orderToSort, setOrderToSort] = useState<SortingType>(SortingType.ASC);

  useEffect(() => {
    fetchData(limitItems, skipItems, orderToSort, selectedCategory);
  }, [skipItems, orderToSort, selectedCategory]);

  const handlePageOnClick = (selectedPage: number): void => {
    setCurrentPage(selectedPage);
  };

  const handleOnRetryButton = (): void => {
    fetchData(limitItems, skipItems, orderToSort, selectedCategory);
  };

  const handleSortingButton = (): void => {
    orderToSort === SortingType.ASC
      ? setOrderToSort(SortingType.DESC)
      : setOrderToSort(SortingType.ASC);
    setCurrentPage(1);
  };

  const handleFilterOnChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const renderContent = (): ReactElement => {
    switch (status) {
      case StatusType.ERROR:
        return <ErrorComponent handleOnRetryButton={handleOnRetryButton} />;
      case StatusType.INITIAL:
        return <LoadingComponent />;
      case StatusType.LOADING:
        return <LoadingComponent />;
      case StatusType.SUCCESS:
        return (
          <>
            <ProductList products={products} />
            <Pagination
              currentPage={currentPage}
              totalProducts={totalProducts}
              itemsPerPage={limitItems}
              handlePageOnClick={handlePageOnClick}
            />
          </>
        );
    }
  };

  return (
    <>
      <h1>List of Products</h1>
      <Header
        selectedCategory={selectedCategory}
        handleFilterOnChange={handleFilterOnChange}
        orderToSort={orderToSort}
        handleSortingButton={handleSortingButton}
      />
      {renderContent()}
    </>
  );
};
