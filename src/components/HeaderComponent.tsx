import { type ReactElement } from "react";
import { ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";

import { useGetCategories } from "../hooks/useGetCategories";

import { SortingType } from "../types/types";

type HeaderProps = {
  selectedCategory: string;
  handleFilterOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  orderToSort: SortingType;
  handleSortingButton: () => void;
};

export const Header = ({
  selectedCategory,
  handleFilterOnChange,
  orderToSort,
  handleSortingButton,
}: HeaderProps): ReactElement => {
  const { categories } = useGetCategories();

  return (
    <div
      className="header"
      aria-label="Product filters and sorting"
      role="group"
    >
      <div className="filter-and-sorting-wrapper">
        <select
          name="category-filter"
          id="category-filter"
          value={selectedCategory}
          onChange={handleFilterOnChange}
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
            <ArrowUpNarrowWide color="#f3f4f6" size={24} strokeWidth={1.5} />
          ) : (
            <ArrowDownWideNarrow color="#f3f4f6" size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
};
