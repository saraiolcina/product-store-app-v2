import { type ReactElement } from "react";

type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  itemsPerPage: number;
  handlePageOnClick: (currentPage: number) => void;
};

export const Pagination = ({
  currentPage,
  totalProducts,
  itemsPerPage,
  handlePageOnClick,
}: PaginationProps): ReactElement => {
  const totalPages: number = Math.ceil(totalProducts / itemsPerPage);

  return (
    <nav className="pagination-wrapper" aria-label="Pagination">
      <button
        type="button"
        aria-label="Previous page button"
        onClick={() => handlePageOnClick(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {"<<"}
      </button>
      <span aria-current="page">{currentPage}</span>
      <button
        type="button"
        aria-label="Next page button"
        onClick={() => handlePageOnClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        {">>"}
      </button>
    </nav>
  );
};
