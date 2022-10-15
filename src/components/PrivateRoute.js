import { Navigate } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

import { useUser } from '../hooks/useUser/useUser';

export const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (user === undefined) return <LoadingOverlay visible overlayBlur={2} />;

  if (user === null) return <Navigate to="sign-in" />;

  return children;
};
