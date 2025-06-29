import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState({
    id: 'ocean',
    name: 'Ocean Breeze',
    background: 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900 dark:to-cyan-900'
  });

  return { theme, setTheme };
};