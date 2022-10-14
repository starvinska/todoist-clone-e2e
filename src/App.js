import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import { ProjectsProvider, SelectedProjectProvider } from './context';
import { Auth } from './components/layout/Auth';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { lightTheme } from './styles/light-theme';
import { darkTheme } from './styles/dark-theme';
import { ThemeModeContext } from './context/themeMode/themeMode.context';
import { UserProvider } from './context/user/user.context';
import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/sign-in" />,
      },
      {
        path: '/auth/sign-in',
        element: <SignIn />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />,
      },
    ],
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
        <ModalsProvider>
          <UserProvider>
            <SelectedProjectProvider>
              <ProjectsProvider>
                <RouterProvider router={router} />
              </ProjectsProvider>
            </SelectedProjectProvider>
          </UserProvider>
        </ModalsProvider>
      </MantineProvider>
    </ThemeModeContext.Provider>
  );
};
