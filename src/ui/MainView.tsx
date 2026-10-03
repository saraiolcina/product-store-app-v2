import { useState, useEffect, type ReactElement } from "react";

import { useFetchData } from "../hooks/useFetchData";

import { Pagination } from "../components/Pagination";
import { ProductList } from "../components/ProductList";
import { ErrorComponent } from "../components/ErrorComponent";
import { LoadingComponent } from "../components/LoadingComponent";

import { StatusType } from "../types/types";

export const MainView = (): ReactElement => {
  const { status, products, totalProducts, fetchData } = useFetchData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;
  const skipItems: number = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    fetchData(skipItems);
  }, [skipItems]);

  const handlePageOnClick = (selectedPage: number): void => {
    setCurrentPage(selectedPage);
  };

  const handleOnRetryButton = (): void => {
    fetchData(skipItems);
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
              itemsPerPage={itemsPerPage}
              handlePageOnClick={handlePageOnClick}
            />
          </>
        );
    }
  };

  return (
    <>
      <h1>List of Products</h1>
      {renderContent()}
    </>
  );
};
