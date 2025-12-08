import { useTheme } from 'styled-components/native';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface AdditionalInfoStepProps {
  bio: string;
  depositLimit: string;
  bettingLimit: string;
  onBioChange: (text: string) => void;
  onDepositLimitChange: (text: string) => void;
  onBettingLimitChange: (text: string) => void;
  bioError?: string;
  depositLimitError?: string;
  bettingLimitError?: string;
}

export const AdditionalInfoStep = ({
  bio,
  depositLimit,
  bettingLimit,
  onBioChange,
  onDepositLimitChange,
  onBettingLimitChange,
  bioError,
  depositLimitError,
  bettingLimitError,
}: AdditionalInfoStepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Almost there!
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          Set your preferences and limits
        </Typography>
      </StepDescription>

      <Input
        variant="light"
        label="Bio (Optional)"
        value={bio}
        onChangeText={onBioChange}
        placeholder="Tell us about yourself"
        multiline
        numberOfLines={3}
        error={bioError}
      />

      <Input
        variant="light"
        label="Deposit Limit (Optional)"
        value={depositLimit}
        onChangeText={onDepositLimitChange}
        placeholder="500"
        keyboardType="numeric"
        error={depositLimitError}
      />

      <Input
        variant="light"
        label="Betting Limit (Optional)"
        value={bettingLimit}
        onChangeText={onBettingLimitChange}
        placeholder="100"
        keyboardType="numeric"
        error={bettingLimitError}
      />
    </StepContainer>
  );
};
