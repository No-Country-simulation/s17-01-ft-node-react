/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

/**
 * Tipo para la función de recuperación de datos.
 * @template T - El tipo de los datos que se están recuperando.
 */
type FetchFunction<T> = () => Promise<T>;

/**
 * Tipo para el valor de retorno del hook `useFetch` cuando `useLocalState` es true.
 * @template T - El tipo de los datos que se están devolviendo.
 */
interface UseFetchReturnTypeWithLocalState<T> {
  /** Los datos recuperados o null si aún no se han recuperado. */
  data: T | null;
  /** Indica si los datos todavía se están recuperando. */
  isLoading: boolean;
  /** Contiene cualquier error que ocurrió durante la recuperación. */
  error: Error | null;
}

/**
 * Tipo para el valor de retorno del hook `useFetch` cuando `useLocalState` es false.
 */
interface UseFetchReturnTypeWithoutLocalState {
  /** Indica si los datos todavía se están recuperando. */
  isLoading: boolean;
  /** Contiene cualquier error que ocurrió durante la recuperación de los datos. */
  error: Error | null;
}

/**
 * Props para el hook `useFetch`.
 * @template T - El tipo de los datos que se están recuperando.
 */
interface UseFetchProps<T> {
  /** Función para recuperar los datos. */
  fetchFn: FetchFunction<T>;
  /** Array de dependencias para el hook useEffect. */
  dependencies?: any[];

  /** Función opcional para llamar en caso de éxito al recuperar los datos. */
  onSuccess?: (data: T) => void;
  /** Función opcional para llamar en caso de error durante la recuperación de los datos. */
  onError?: (error: Error) => void;

  /** Flag para indicar si se debe usar el estado local. Por defecto es true. */
  useLocalState?: boolean;

  /** Retraso opcional en milisegundos para el estado de carga. */
  loadingDelay?: number;

  /** Callback opcional que se ejecuta después de la recuperación de datos, sin importar el resultado. */
  onFinally?: () => void;
}

/**
 * Hook personalizado para recuperar datos y gestionar el estado de carga y error.
 * @template T - El tipo de los datos que se están recuperando.
 * @param {UseFetchProps<T>} params - Parámetros para la recuperación y gestión de datos.
 * @param {FetchFunction<T>} params.fetchFn - Función que recupera los datos.
 * @param {any[]} [params.dependencies=[]] - Array de dependencias para el hook `useEffect`. Cuando cambian, se vuelve a ejecutar el hook.
 * @param {(data: T) => void} [params.onSuccess] - Función opcional que se llama cuando la recuperación de datos es exitosa. Recibe los datos recuperados.
 * @param {(error: Error) => void} [params.onError] - Función opcional que se llama cuando ocurre un error durante la recuperación de datos. Recibe el error.
 * @param {boolean} [params.useLocalState=true] - Flag para indicar si se debe usar el estado local. Si es `true`, el hook maneja el estado local; si es `false`, solo se ejecutan las funciones `onSuccess` y `onError`.
 * @param {number} [params.loadingDelay=0] - Retraso opcional en milisegundos para el estado de carga.
 * @param {() => void} [params.onFinally] - Callback opcional que se ejecuta después de la recuperación de datos, sin importar el resultado.
 * @returns {UseFetchReturnTypeWithLocalState<T> | UseFetchReturnTypeWithoutLocalState} - Retorna un objeto con:
 *   - `data`: Los datos recuperados o `null` si aún no se han recuperado (solo si `useLocalState` es `true`).
 *   - `isLoading`: `true` si los datos todavía se están recuperando, `false` en caso contrario.
 *   - `error`: Contiene el error que ocurrió durante la recuperación, o `null` si no hubo errores.
 */
export function useFetch<T>({
  fetchFn,
  dependencies = [],
  onSuccess,
  onError,
  useLocalState = true,
  loadingDelay = 0,
  onFinally,
}: UseFetchProps<T>):
  | UseFetchReturnTypeWithLocalState<T>
  | UseFetchReturnTypeWithoutLocalState {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      // Set a timer to handle the loading delay
      const timer = setTimeout(() => {
        fetchFn()
          .then((result) => {
            if (useLocalState) {
              console.log("esty cac useLocalState");
              setData(result);
            }
            if (onSuccess) onSuccess(result);
          })
          .catch((err) => {
            setError(err as Error);
            if (onError) onError(err as Error);
          })
          .finally(() => {
            clearTimeout(timer);
            setIsLoading(false);
            if (onFinally) onFinally();
          });
      }, loadingDelay);
    };

    fetchData();
  }, dependencies);

  // Retorna el estado basado en si se usa el estado local o no
  if (useLocalState) {
    console.log("esty cac useLocalState debria devolver esto");
    return { data, isLoading, error } as UseFetchReturnTypeWithLocalState<T>;
  } else {
    return { isLoading, error } as UseFetchReturnTypeWithoutLocalState;
  }
}
