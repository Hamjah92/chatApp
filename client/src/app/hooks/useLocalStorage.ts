import { useEffect, useState } from "react";



export const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    const localValue = localStorage.getItem(key);
    return localValue != null ? JSON.parse(localValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}