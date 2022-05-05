import * as React from 'react';

/**
 * Hook used to initialize a local value.
 */
export function useLocalDefault(name: string, initialState: any) {
  React.useEffect(() => {
    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, initialState);
    }
  }, [name, initialState]);
}
