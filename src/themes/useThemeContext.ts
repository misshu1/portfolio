import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('themeContext has to be used within <ThemeProvider>');
  }

  return themeContext;
};
