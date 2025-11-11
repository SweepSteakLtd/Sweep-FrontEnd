import ConfettiCannon from 'react-native-confetti-cannon';
import { useTheme } from 'styled-components/native';
import { Typography } from '~/components/Typography/Typography';
import { Container } from '../../screens/CreateProfile/styles';

export const SuccessState = () => {
  const theme = useTheme();

  return (
    <Container style={{ justifyContent: 'center', alignItems: 'center', padding: 48 }}>
      <Typography
        variant="title"
        color={theme.colors.primary}
        style={{ fontSize: 64, marginBottom: 20, lineHeight: 72, textAlign: 'center' }}
      >
        🎉
      </Typography>
      <Typography
        variant="heading"
        color={theme.colors.text.primary}
        style={{ fontSize: 24, textAlign: 'center' }}
      >
        Profile Created!
      </Typography>
      <Typography
        variant="body"
        color={theme.colors.text.secondary}
        style={{ marginTop: 12, textAlign: 'center', fontSize: 16 }}
      >
        Welcome to SweepSteak!
      </Typography>
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut
        autoStart
        explosionSpeed={350}
      />
    </Container>
  );
};
