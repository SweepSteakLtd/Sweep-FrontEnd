import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { firebaseAuth } from '~/lib/firebase';
import { useGetUser, userQueryKeys } from '~/services/apis/User/useGetUser';
import { ButtonContainer, Container, ContentContainer, Title, UserName } from './styles';

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const { data: user, refetch } = useGetUser();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdToken().then(() => {
          if (!user) {
            refetch();
          }
        }).catch((error) => {
          console.error('Error getting ID token:', error);
        });
      }
    });

    return () => unsubscribe();
  }, [user, refetch]);

  const logOutUser = async () => {
    await signOut(firebaseAuth);
    await AsyncStorage.removeItem('access_token');
    // Clear user from React Query cache
    queryClient.setQueryData(userQueryKeys.user, null);
    queryClient.invalidateQueries({ queryKey: userQueryKeys.user });
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <ContentContainer>
        <Title>Welcome to SweepSteak!</Title>
        <UserName>
          {user.first_name} {user.last_name}
        </UserName>
        <UserName>{user.email}</UserName>

        <ButtonContainer>
          <Button title="Log out" onPress={() => logOutUser()} />
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};
