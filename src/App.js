import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';

import { ProjectsProvider, SelectedProjectProvider } from './context';
import { lightTheme } from './styles/light-theme';
import { darkTheme } from './styles/dark-theme';
import { ThemeModeContext } from './context/themeMode/themeMode.context';
import { UserProvider } from './context/user/user.context';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { PrivateRoute } from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/sign-in',
    element: <Auth mode="sign-in" />,
  },
  {
    path: '/sign-up',
    element: <Auth mode="sign-up" />,
  },
]);

export const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeModeContext.Provider
      value={{
        darkMode,
        toggleMode: () => {
          setDarkMode((prev) => !prev);
        },
      }}
    >
      <MantineProvider theme={darkMode ? darkTheme : lightTheme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <ModalsProvider>
            <UserProvider>
              <SelectedProjectProvider>
                <ProjectsProvider>
                  <RouterProvider router={router} />
                </ProjectsProvider>
              </SelectedProjectProvider>
            </UserProvider>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ThemeModeContext.Provider>
  );
};
