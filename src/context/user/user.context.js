import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
