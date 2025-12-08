import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Typography } from '~/components/Typography/Typography';
import { ButtonGroup, Container } from '../../screens/CreateProfile/styles';

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
}

export const ErrorState = ({ errorMessage, onRetry }: ErrorStateProps) => {
  const theme = useTheme();

  return (
    <Container>
      <KeyboardAwareScrollView
        bottomOffset={140}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="title"
          color={theme.colors.error}
          style={{ fontSize: 64, marginBottom: 20, lineHeight: 72, textAlign: 'center' }}
        >
          ⚠️
        </Typography>
        <Typography
          variant="heading"
          color={theme.colors.text.primary}
          style={{ fontSize: 24, textAlign: 'center' }}
        >
          Failed to create profile
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.text.secondary}
          style={{ marginTop: 12, textAlign: 'center', fontSize: 16, paddingHorizontal: 24 }}
        >
          {errorMessage}
        </Typography>
      </KeyboardAwareScrollView>
      <KeyboardStickyView>
        <ButtonGroup>
          <Button variant="primary" title="Try Again" onPress={onRetry} style={{ flex: 1 }} />
        </ButtonGroup>
      </KeyboardStickyView>
    </Container>
  );
};
