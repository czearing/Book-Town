import * as React from 'react';

/**
 * Returns a value in local storage at the given name.
 */
export function useGetLocal(name: string) {
  const value = React.useRef('');

  React.useEffect(() => {
    value.current = localStorage.getItem(name) || '';
  }, [name]);

  return value.current;
}
