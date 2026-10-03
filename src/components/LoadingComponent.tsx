import { type ReactElement } from "react";

export const LoadingComponent = (): ReactElement => {
  return (
    <div className="loading-wrapper">
      <p role="status">Product list is loading...</p>
    </div>
  );
};
