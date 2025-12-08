import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface VerificationCodeStepProps {
  isVerified: boolean;
  onVerified: (fullPhoneNumber: string) => void;
  verifyCode: (code: string) => Promise<boolean>;
  verificationError: string | null;
  clearError: () => void;
  verifying?: boolean;
  fullPhoneNumber: string;
}

export interface VerificationCodeStepHandle {
  handleNext: () => Promise<boolean>;
}

export const VerificationCodeStep = forwardRef<
  VerificationCodeStepHandle,
  VerificationCodeStepProps
>(
  (
    {
      isVerified,
      onVerified,
      verifyCode,
      verificationError,
      clearError,
      verifying,
      fullPhoneNumber,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [otpCode, setOtpCode] = useState('');
    const [otpError, setOtpError] = useState<string | undefined>();

    const handleNext = async (): Promise<boolean> => {
      // If already verified, allow to proceed
      if (isVerified) {
        return true;
      }

      clearError();
      setOtpError(undefined);

      if (!otpCode) {
        setOtpError('Verification code is required');
        return false;
      }

      const success = await verifyCode(otpCode);
      if (success) {
        onVerified(fullPhoneNumber);
        return true; // Advance to step 4
      } else {
        setOtpError(verificationError || 'Invalid verification code. Please try again.');
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      handleNext,
    }));

    return (
      <StepContainer>
        <StepTitle>
          <Typography variant="heading" color={theme.colors.text.primary}>
            Verify your phone number
          </Typography>
        </StepTitle>
        <StepDescription>
          <Typography variant="body" color={theme.colors.text.secondary}>
            Enter the 6-digit code we sent to your phone
          </Typography>
        </StepDescription>

        <Input
          variant="light"
          label="Verification Code"
          value={otpCode}
          onChangeText={setOtpCode}
          placeholder="123456"
          keyboardType="number-pad"
          maxLength={6}
          error={otpError}
          editable={!isVerified && !verifying}
        />
        {isVerified && (
          <Typography variant="body" color={theme.colors.primary} style={{ marginTop: 8 }}>
            ✓ Phone number verified successfully
          </Typography>
        )}
      </StepContainer>
    );
  },
);

VerificationCodeStep.displayName = 'VerificationCodeStep';
