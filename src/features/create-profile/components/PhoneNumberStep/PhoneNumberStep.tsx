import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { PhoneNumberInput } from '~/components/PhoneNumberInput/PhoneNumberInput';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface PhoneNumberStepProps {
  phoneNumber: string;
  onPhoneNumberChange: (text: string) => void;
  phoneNumberError?: string;
  sendVerificationCode: (phone: string) => Promise<boolean>;
  verificationError: string | null;
  clearError: () => void;
  sending?: boolean;
  phoneVerified?: boolean;
  verifiedPhoneNumber?: string;
}

export interface PhoneNumberStepHandle {
  handleNext: () => Promise<boolean>;
  getPhoneNumber: () => string;
}

export const PhoneNumberStep = forwardRef<PhoneNumberStepHandle, PhoneNumberStepProps>(
  (
    {
      phoneNumber,
      onPhoneNumberChange,
      phoneNumberError,
      sendVerificationCode,
      verificationError,
      clearError,
      sending,
      phoneVerified,
      verifiedPhoneNumber,
    },
    ref,
  ) => {
    const theme = useTheme();
    const [phoneError, setPhoneError] = useState<string | undefined>(phoneNumberError);

    const handleNext = async (): Promise<boolean> => {
      clearError();
      setPhoneError(undefined);

      if (!phoneNumber) {
        setPhoneError('Phone number is required');
        return false;
      }

      console.log('PhoneNumberStep - phoneNumber (E.164):', phoneNumber);

      // Skip verification if phone number is already verified and hasn't changed
      if (phoneVerified && verifiedPhoneNumber === phoneNumber) {
        return true; // Skip to next step without re-verifying
      }

      const success = await sendVerificationCode(phoneNumber);
      if (success) {
        return true; // Advance to step 3 (verification code)
      } else {
        setPhoneError(verificationError || 'Failed to send verification code');
        return false;
      }
    };

    const getPhoneNumber = () => {
      // The PhoneNumberInput library already returns E.164 formatted numbers
      return phoneNumber;
    };

    useImperativeHandle(ref, () => ({
      handleNext,
      getPhoneNumber,
    }));

    return (
      <StepContainer>
        <StepTitle>
          <Typography variant="heading" color={theme.colors.text.primary}>
            Enter your phone number
          </Typography>
        </StepTitle>
        <StepDescription>
          <Typography variant="body" color={theme.colors.text.secondary}>
            We'll send you a verification code to confirm your number
          </Typography>
        </StepDescription>

        <PhoneNumberInput
          label="Phone Number"
          onChangeText={onPhoneNumberChange}
          error={phoneError || phoneNumberError}
          placeholder="7123 456789"
          editable={!sending}
        />
      </StepContainer>
    );
  },
);

PhoneNumberStep.displayName = 'PhoneNumberStep';
