import { type ReactElement } from "react";

type ErrorProps = {
  handleOnRetryButton: () => void;
};

export const ErrorComponent = ({
  handleOnRetryButton,
}: ErrorProps): ReactElement => {
  return (
    <div className="error-wrapper">
      <p role="alert">There has been an error. Please retry</p>
      <button type="button" onClick={handleOnRetryButton}>
        Retry
      </button>
    </div>
  );
};
