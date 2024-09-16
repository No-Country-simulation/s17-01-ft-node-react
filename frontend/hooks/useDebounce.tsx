import { useState, useEffect } from "react";

/**
 * Hook que retarda la actualización de un valor.
 *
 * @param value - El valor a debilitar.
 * @param delay - El tiempo en milisegundos para retardar la actualización del valor.
 * @returns El valor retardado.
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
