import { firebaseAuth } from '../../lib/firebase';
import { User } from './types';

export const createUser = async (
  body: Pick<User, 'first_name' | 'last_name' | 'email' | 'phone_number'>,
) => {
  // worth to set into provider to reduce amount of calls on that function?
  const token = await firebaseAuth.currentUser?.getIdToken();
  return fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', 'x-auth-id': token || '' },
    // always send token, even if it's empty string => backend will handle check if needed or not
  });
};

export const getUser = async (): Promise<User | null> => {
  const token = await firebaseAuth.currentUser?.getIdToken();
  if (!token) return null;

  const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
  });

  if (res.status !== 200) return null;

  const data = (await res.json()).data as User;
  console.log('Fetched user from backend:', data);
  return data;
};
