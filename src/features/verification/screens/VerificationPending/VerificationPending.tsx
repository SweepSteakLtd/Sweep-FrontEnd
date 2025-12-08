import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useDeleteUser } from '~/services/apis/User/useDeleteUser';
import { ButtonGroup, Container } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * VerificationPending screen shows when user's identity verification has failed
 * Simple error state - no polling, just shows error message
 */
export const VerificationPending = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { isPending: isDeleting, handleDeleteAccount } = useDeleteUser();

  const handleRetry = () => {
    // Redirect to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

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
          ‼️
        </Typography>
        <Typography
          variant="heading"
          color={theme.colors.text.primary}
          style={{ fontSize: 24, textAlign: 'center' }}
        >
          Verification Failed
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.text.secondary}
          style={{ marginTop: 12, textAlign: 'center', fontSize: 16, paddingHorizontal: 24 }}
        >
          Identity verification failed. Please contact support.
        </Typography>
      </KeyboardAwareScrollView>
      <KeyboardStickyView>
        <ButtonGroup>
          <Button
            variant="secondary"
            title={isDeleting ? 'Deleting...' : 'Delete Account'}
            onPress={handleDeleteAccount}
            disabled={isDeleting}
            loading={isDeleting}
            backgroundColor={theme.colors.error}
            style={{
              borderColor: theme.colors.error,
            }}
          />
          <Button variant="primary" title="Back to Login" onPress={handleRetry} />
        </ButtonGroup>
      </KeyboardStickyView>
    </Container>
  );
};
