import { useState, useEffect } from "react";

type useDebounceReturnType = {
  debouncedValue: string;
};

export const useDebounce = (
  inputValue: string,
  time: number
): useDebounceReturnType => {
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  useEffect(() => {
    const timerId: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, time);

    return () => clearTimeout(timerId);
  }, [inputValue, time]);

  return {
    debouncedValue,
  };
};
