import {
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import type {
  ContextSelector,
  Context,
} from "@fluentui/react-context-selector";
import type { Theme } from "@cebus/react-components";

export type AppContextValue = {
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  findTheme: (theme: string) => Theme;
};

export const AppContext: Context<AppContextValue> =
  createContext<AppContextValue>({
    setTheme: () => {},
    findTheme: () => ({} as Theme),
  });

export const AppProvider = AppContext.Provider;

export const useAppContext = <T,>(
  selector: ContextSelector<AppContextValue, T>
) => useContextSelector(AppContext, selector);
