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
    },
    ref,
  ) => {
    const theme = useTheme();
    const [callingCode, setCallingCode] = useState('44');
    const [phoneError, setPhoneError] = useState<string | undefined>(phoneNumberError);

    const handleCountryChange = (_countryCode: string, newCallingCode: string) => {
      setCallingCode(newCallingCode);
    };

    const handleNext = async (): Promise<boolean> => {
      clearError();
      setPhoneError(undefined);

      if (!phoneNumber) {
        setPhoneError('Phone number is required');
        return false;
      }

      // Format phone number with country code
      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;

      const success = await sendVerificationCode(fullPhoneNumber);
      if (success) {
        return true; // Advance to step 3 (verification code)
      } else {
        setPhoneError(verificationError || 'Failed to send verification code');
        return false;
      }
    };

    const getPhoneNumber = () => {
      return `+${callingCode}${phoneNumber}`;
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
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
          error={phoneError || phoneNumberError}
          placeholder="7123 456789"
          onCountryChange={handleCountryChange}
        />
      </StepContainer>
    );
  },
);

PhoneNumberStep.displayName = 'PhoneNumberStep';
