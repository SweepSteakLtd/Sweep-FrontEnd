import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { View } from 'react-native';
import { getUser } from '../backend/backend';
import { User } from '../backend/types';

const UserContext = createContext<{
  user: User | null;
  updateUser: (user: User | null) => void;
  getUser: () => Promise<void>;
}>({
  user: null,
  updateUser: () => {},
  getUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const getUserFromBackend = async () => {
    getUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((err) => {
        console.log('[DEBUG]: failed to fetch user', err);
      });
  };

  const updateUser = (user: User | null) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, getUser: getUserFromBackend }}>
      <View>{children}</View>
    </UserContext.Provider>
  );
};
