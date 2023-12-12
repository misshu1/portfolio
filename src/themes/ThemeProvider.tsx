import { FC, createContext, useState } from 'react';
import { Theme, ThemeProviderProps, ThemeContextType } from './types';

const initialState: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(initialState);
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
