import { useRef } from "react";

export default function useDebounce() {
  const timerRef = useRef();

  const debounce = (func, wait) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      func();
    }, wait);
  };
  return debounce;
}
