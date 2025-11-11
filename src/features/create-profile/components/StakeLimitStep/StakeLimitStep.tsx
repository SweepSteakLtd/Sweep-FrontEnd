import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { LimitInput } from '~/components/LimitInput/LimitInput';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface StakeLimitStepProps {
  bettingLimit: string;
  onBettingLimitChange: (text: string) => void;
  bettingLimitError?: string;
}

export const StakeLimitStep = ({
  bettingLimit,
  onBettingLimitChange,
  bettingLimitError,
}: StakeLimitStepProps) => {
  const theme = useTheme();
  const [noLimit, setNoLimit] = useState(false);

  const handleNoLimitToggle = () => {
    setNoLimit(!noLimit);
    if (!noLimit) {
      onBettingLimitChange('');
    }
  };

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Set your stake limit
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          Control how much you can stake per bet to manage your risk (optional)
        </Typography>
      </StepDescription>

      <LimitInput
        title="Daily Stake Limit"
        value={bettingLimit}
        onChangeText={onBettingLimitChange}
        noLimit={noLimit}
        onNoLimitToggle={handleNoLimitToggle}
        placeholder="100"
        label="Set Limit"
      />

      {bettingLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {bettingLimitError}
        </Typography>
      )}
    </StepContainer>
  );
};
