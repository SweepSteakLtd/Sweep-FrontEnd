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
  const [noDailyLimit, setNoDailyLimit] = useState(false);
  const [noWeeklyLimit, setNoWeeklyLimit] = useState(false);
  const [noMonthlyLimit, setNoMonthlyLimit] = useState(false);

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
        title="Daily Deposit Limit"
        value={dailyLimit}
        onChangeText={onDailyLimitChange}
        noLimit={noDailyLimit}
        onNoLimitToggle={handleNoDailyLimitToggle}
        placeholder="500"
        label="Set Limit"
      />

      {dailyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {dailyLimitError}
        </Typography>
      )}

      <LimitInput
        title="Weekly Deposit Limit"
        value={weeklyLimit}
        onChangeText={onWeeklyLimitChange}
        noLimit={noWeeklyLimit}
        onNoLimitToggle={handleNoWeeklyLimitToggle}
        placeholder="2000"
        label="Set Limit"
      />

      {weeklyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {weeklyLimitError}
        </Typography>
      )}

      <LimitInput
        title="Monthly Deposit Limit"
        value={monthlyLimit}
        onChangeText={onMonthlyLimitChange}
        noLimit={noMonthlyLimit}
        onNoLimitToggle={handleNoMonthlyLimitToggle}
        placeholder="5000"
        label="Set Limit"
      />

      {monthlyLimitError && (
        <Typography variant="body" color={theme.colors.error} style={{ marginTop: 8 }}>
          {monthlyLimitError}
        </Typography>
      )}
    </StepContainer>
  );
};
