import { useTheme } from 'styled-components/native';
import { TextAreaInput } from '~/components/TextAreaInput/TextAreaInput';
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

      <TextAreaInput
        variant="light"
        label="Bio"
        value={bio}
        onChangeText={onBioChange}
        placeholder="Tell us about yourself..."
        maxLength={500}
        showCharacterCount
        error={bioError}
      />
    </StepContainer>
  );
};
