import { useTheme } from 'styled-components/native';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface BioStepProps {
  bio: string;
  onBioChange: (text: string) => void;
  bioError?: string;
}

export const BioStep = ({ bio, onBioChange, bioError }: BioStepProps) => {
  const theme = useTheme();

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Tell us about yourself
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          Share a bit about yourself (optional)
        </Typography>
      </StepDescription>

      <Input
        variant="light"
        label="Bio"
        value={bio}
        onChangeText={onBioChange}
        placeholder="Tell us about yourself..."
        multiline
        numberOfLines={4}
        error={bioError}
      />
    </StepContainer>
  );
};
