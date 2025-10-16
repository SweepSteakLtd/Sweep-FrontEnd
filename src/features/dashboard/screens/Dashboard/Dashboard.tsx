import { useState } from 'react';
import { Button } from '~/components/Button';
import { useAuth } from '~/contexts/AuthContext';
import { ButtonContainer, Container, ContentContainer } from './styles';

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
        <ButtonContainer>
          <Button variant="primary" onPress={handleLogout} loading={loggingOut} disabled={loggingOut}>
            Log Out
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};
