import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { Button } from '~/components/Button/Button';
import { useAuth } from '~/contexts/AuthContext';
import type { RootStackParamList } from '~/navigation/types';
import { AmountContainer, ButtonContainer, Container, ContentContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const { signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    navigation.popToTop();
  };

  return (
    <Container>
      <ContentContainer>
        <AmountContainer>
          <AnimatedAmount value={52300} variant="title" align="center" />
        </AmountContainer>
        <ButtonContainer>
          <Button variant="primary" onPress={handleLogout} loading={loggingOut} disabled={loggingOut}>
            Log Out
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};
