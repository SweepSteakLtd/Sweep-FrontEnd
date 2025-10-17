import { useState } from 'react';
import { AnimatedAmount } from '~/components/AnimatedAmount/AnimatedAmount';
import { Button } from '~/components/Button/Button';
import { useAuth } from '~/contexts/AuthContext';
import { AmountContainer, ButtonContainer, Container, ContentContainer } from './styles';

export const Dashboard = () => {
  const { signOut } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    setLoggingOut(false);
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
