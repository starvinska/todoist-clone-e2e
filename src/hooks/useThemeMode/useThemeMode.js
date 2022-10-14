import { useContext } from 'react';

import { ThemeModeContext } from '../../context/themeMode/themeMode.context';

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);

  if (context === undefined) {
    throw new Error(`useThemeMode must be used within a ThemeModeContextProvider.`);
  }

  return context;
};
