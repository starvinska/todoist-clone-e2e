import { Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

import { useThemeMode } from '../../hooks/useThemeMode/useThemeMode';

import { Header } from './Header';

export const Auth = () => {
  const { darkMode } = useThemeMode();

  return (
    <main className={darkMode ? 'darkmode' : undefined}>
      <Header />
      <Box
        sx={(theme) => ({
          maxWidth: 400,
          margin: `calc(44px + ${theme.spacing.xl}px) auto 0 auto`,
          background: theme.white,
          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.sm,
        })}
      >
        <Outlet />
      </Box>
    </main>
  );
};
