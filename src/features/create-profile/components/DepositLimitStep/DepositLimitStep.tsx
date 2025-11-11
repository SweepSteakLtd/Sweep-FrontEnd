import { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { LimitInput } from '~/components/LimitInput/LimitInput';
import { Typography } from '~/components/Typography/Typography';
import { StepContainer, StepDescription, StepTitle } from './styles';

interface DepositLimitStepProps {
  dailyLimit: string;
  weeklyLimit: string;
  monthlyLimit: string;
  onDailyLimitChange: (text: string) => void;
  onWeeklyLimitChange: (text: string) => void;
  onMonthlyLimitChange: (text: string) => void;
  dailyLimitError?: string;
  weeklyLimitError?: string;
  monthlyLimitError?: string;
}

export const DepositLimitStep = ({
  dailyLimit,
  weeklyLimit,
  monthlyLimit,
  onDailyLimitChange,
  onWeeklyLimitChange,
  onMonthlyLimitChange,
  dailyLimitError,
  weeklyLimitError,
  monthlyLimitError,
}: DepositLimitStepProps) => {
  const theme = useTheme();
  const [noDailyLimit, setNoDailyLimit] = useState(true);
  const [noWeeklyLimit, setNoWeeklyLimit] = useState(true);
  const [noMonthlyLimit, setNoMonthlyLimit] = useState(true);

  const handleNoDailyLimitToggle = () => {
    setNoDailyLimit(!noDailyLimit);
    if (!noDailyLimit) {
      onDailyLimitChange('');
    }
  };

  const handleNoWeeklyLimitToggle = () => {
    setNoWeeklyLimit(!noWeeklyLimit);
    if (!noWeeklyLimit) {
      onWeeklyLimitChange('');
    }
  };

  const handleNoMonthlyLimitToggle = () => {
    setNoMonthlyLimit(!noMonthlyLimit);
    if (!noMonthlyLimit) {
      onMonthlyLimitChange('');
    }
  };

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Set your deposit limits
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          Control how much you can deposit to help manage your spending (optional)
        </Typography>
      </StepDescription>

      <LimitInput
        title="Daily"
        value={dailyLimit}
        onChangeText={onDailyLimitChange}
        noLimit={noDailyLimit}
        onNoLimitToggle={handleNoDailyLimitToggle}
        label="Set Limit"
        showCurrentLimit={false}
      />

      {dailyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {dailyLimitError}
        </Typography>
      )}

      <LimitInput
        title="Weekly"
        value={weeklyLimit}
        onChangeText={onWeeklyLimitChange}
        noLimit={noWeeklyLimit}
        onNoLimitToggle={handleNoWeeklyLimitToggle}
        label="Set Limit"
        showCurrentLimit={false}
      />

      {weeklyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {weeklyLimitError}
        </Typography>
      )}

      <LimitInput
        title="Monthly"
        value={monthlyLimit}
        onChangeText={onMonthlyLimitChange}
        noLimit={noMonthlyLimit}
        onNoLimitToggle={handleNoMonthlyLimitToggle}
        label="Set Limit"
        showCurrentLimit={false}
      />

      {monthlyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {monthlyLimitError}
        </Typography>
      )}
    </StepContainer>
  );
};
