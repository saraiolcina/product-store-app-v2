import { type ReactElement } from "react";
import { ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";

import { SortingType } from "../types/types";

type HeaderProps = {
  selectedCategory: string;
  handleFilterOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  orderToSort: SortingType;
  handleSortingButton: () => void;
  searchValue: string;
  handleSearchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
};

export const Header = ({
  selectedCategory,
  handleFilterOnChange,
  orderToSort,
  handleSortingButton,
  searchValue,
  handleSearchOnChange,
  categories,
}: HeaderProps): ReactElement => {
  return (
    <div
      className="header"
      aria-label="Product filters and sorting"
      role="group"
    >
      <div className="filter-and-sorting-wrapper">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search a product"
          value={searchValue}
          onChange={handleSearchOnChange}
          disabled={selectedCategory.length > 0}
        />
        <select
          name="category-filter"
          id="category-filter"
          value={selectedCategory}
          onChange={handleFilterOnChange}
          disabled={searchValue.length > 0}
        >
          <option value={""}>Category</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <button
          id={`${orderToSort}-sorting-button`}
          type="button"
          aria-label={`Sort by price, currently ${
            orderToSort === SortingType.ASC ? "ascending" : "descending"
          }`}
          onClick={handleSortingButton}
        >
          {orderToSort === SortingType.DESC ? (
            <ArrowDownWideNarrow size={24} strokeWidth={1.5} />
          ) : (
            <ArrowUpNarrowWide size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};
