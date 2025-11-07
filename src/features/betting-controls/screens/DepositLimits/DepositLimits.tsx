import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import { Checkbox } from '~/components/Checkbox/Checkbox';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Typography } from '~/components/Typography/Typography';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import { penceToPounds, poundsToPence } from '~/utils/currency';
import {
  ButtonContainer,
  CheckboxContainer,
  Container,
  CurrentLimitText,
  InputRow,
  LimitLabel,
  LimitTitle,
  Section,
  TitleRow,
} from './styles';

type LimitConfig = {
  id: string;
  title: string;
  currentLimit: string;
  newLimit: string;
  noLimit: boolean;
  setNewLimit: (value: string) => void;
  setNoLimit: (value: boolean) => void;
};

export const DepositLimits = () => {
  const theme = useTheme();
  const { data: user } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { showAlert } = useAlert();

  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [weeklyLimit, setWeeklyLimit] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');

  const [monthlyNoLimit, setMonthlyNoLimit] = useState(false);
  const [weeklyNoLimit, setWeeklyNoLimit] = useState(false);
  const [dailyNoLimit, setDailyNoLimit] = useState(false);

  const depositLimits: LimitConfig[] = [
    {
      id: 'monthly',
      title: 'Monthly Limit',
      currentLimit: penceToPounds(user?.deposit_limit?.monthly).toFixed(2),
      newLimit: monthlyLimit,
      noLimit: monthlyNoLimit,
      setNewLimit: setMonthlyLimit,
      setNoLimit: setMonthlyNoLimit,
    },
    {
      id: 'weekly',
      title: 'Weekly Limit',
      currentLimit: penceToPounds(user?.deposit_limit?.weekly).toFixed(2),
      newLimit: weeklyLimit,
      noLimit: weeklyNoLimit,
      setNewLimit: setWeeklyLimit,
      setNoLimit: setWeeklyNoLimit,
    },
    {
      id: 'daily',
      title: 'Daily Limit',
      currentLimit: penceToPounds(user?.deposit_limit?.daily).toFixed(2),
      newLimit: dailyLimit,
      noLimit: dailyNoLimit,
      setNewLimit: setDailyLimit,
      setNoLimit: setDailyNoLimit,
    },
  ];

  const handleUpdate = () => {
    // Build the deposit_limit object
    const depositLimit: {
      daily?: number;
      weekly?: number;
      monthly?: number;
    } = {};

    // Only include fields that have values (not "No Limit")
    // Convert pounds to pence for API
    if (!dailyNoLimit && dailyLimit) {
      depositLimit.daily = poundsToPence(dailyLimit);
    }
    if (!weeklyNoLimit && weeklyLimit) {
      depositLimit.weekly = poundsToPence(weeklyLimit);
    }
    if (!monthlyNoLimit && monthlyLimit) {
      depositLimit.monthly = poundsToPence(monthlyLimit);
    }

    // Check if user made any changes
    if (
      Object.keys(depositLimit).length === 0 &&
      !dailyNoLimit &&
      !weeklyNoLimit &&
      !monthlyNoLimit
    ) {
      showAlert({
        title: 'No Changes',
        message: 'Please enter new limits or select "No Limit" options.',
      });
      return;
    }

    updateUser(
      { deposit_limit: depositLimit },
      {
        onSuccess: () => {
          showAlert({
            title: 'Success',
            message: 'Deposit limits updated successfully',
          });
          // Clear the input fields
          setDailyLimit('');
          setWeeklyLimit('');
          setMonthlyLimit('');
          setDailyNoLimit(false);
          setWeeklyNoLimit(false);
          setMonthlyNoLimit(false);
        },
        onError: (error) => {
          showAlert({
            title: 'Error',
            message: 'Failed to update deposit limits. Please try again.',
          });
          console.error('Update deposit limits error:', error);
        },
      },
    );
  };

  const handleNoLimitToggle = (limit: LimitConfig) => {
    const newNoLimitValue = !limit.noLimit;
    limit.setNoLimit(newNoLimitValue);
    if (newNoLimitValue) {
      // Clear the input when No Limit is checked
      limit.setNewLimit('');
    }
  };

  const renderLimitCard = (limit: LimitConfig) => (
    <InputRow key={limit.id}>
      <TitleRow>
        <LimitTitle>{limit.title}</LimitTitle>
        <CurrentLimitText>Current: £{limit.currentLimit || 'No Limit'}</CurrentLimitText>
      </TitleRow>

      <LimitLabel>New Limit</LimitLabel>
      <Input
        variant="currency"
        value={limit.newLimit}
        onChangeText={limit.setNewLimit}
        placeholder="Amount"
        editable={!limit.noLimit}
      />

      <CheckboxContainer>
        <Checkbox checked={limit.noLimit} onPress={() => handleNoLimitToggle(limit)}>
          <Typography variant="body" color={theme.colors.text.primary}>
            No Limit
          </Typography>
        </Checkbox>
      </CheckboxContainer>
    </InputRow>
  );

  return (
    <ScreenWrapper title="Deposit Limits">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={10}
        >
          <Section>{depositLimits.map(renderLimitCard)}</Section>
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button variant="secondary" onPress={handleUpdate} disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
