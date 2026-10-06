import { type ReactElement } from "react";

export const EmptyComponent = (): ReactElement => {
  return (
    <div className="empty-wrapper">
      <p role="status">There are no products with those requirements</p>
    </div>
  );
};
