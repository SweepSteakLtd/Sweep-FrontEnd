import { useTheme } from 'styled-components/native';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface BasicInfoStepProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (text: string) => void;
  onLastNameChange: (text: string) => void;
  firstNameError?: string;
  lastNameError?: string;
}

export const BasicInfoStep = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  firstNameError,
  lastNameError,
}: BasicInfoStepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Let's start with the basics
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          Tell us your legal name, this is needed to verify your identity.
        </Typography>
      </StepDescription>

      <Input
        variant="light"
        label="First Name"
        value={firstName}
        onChangeText={onFirstNameChange}
        placeholder="John"
        autoCapitalize="words"
        error={firstNameError}
      />

      <Input
        variant="light"
        label="Last Name"
        value={lastName}
        onChangeText={onLastNameChange}
        placeholder="Smith"
        autoCapitalize="words"
        error={lastNameError}
      />
    </StepContainer>
  );
};
