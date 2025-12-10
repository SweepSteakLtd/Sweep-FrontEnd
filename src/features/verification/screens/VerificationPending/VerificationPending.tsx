import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { DevMockButton } from '~/components/DevMockButton/DevMockButton';
import { Typography } from '~/components/Typography/Typography';
import { LoadingState } from '~/features/create-profile/components/LoadingState/LoadingState';
import { ButtonGroup, Container } from './styles';
import { useVerificationPending } from './useVerificationPending';

/**
 * VerificationPending screen shows when user's identity verification is in progress or has failed
 * - If GBG status is IN_PROGRESS, shows loading state with animated hourglass
 * - If GBG status is PASS, navigates to Dashboard
 * - If GBG status is MANUAL or FAIL, shows error state
 */
export const VerificationPending = () => {
  const theme = useTheme();
  const { isVerifying, isServerError, isDeleting, errorMessage, handleDeleteAccount, handleRetry } =
    useVerificationPending();

  if (isVerifying) {
    return (
      <Container>
        <LoadingState
          title="Verifying your identity"
          description="This may take a few moments..."
          showProgressBar={false}
        />
        <DevMockButton />
      </Container>
    );
  }

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
          {errorMessage}
        </Typography>
      </KeyboardAwareScrollView>
      <KeyboardStickyView>
        <ButtonGroup>
          {!isServerError && (
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
          )}
          <Button
            variant="primary"
            title={isServerError ? 'Try Again' : 'Back to Login'}
            onPress={handleRetry}
          />
        </ButtonGroup>
      </KeyboardStickyView>
    </Container>
  );
};
