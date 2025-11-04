import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Checkbox } from '~/components/Checkbox/Checkbox';
import { Input } from '~/components/Input/Input';
import { TabBar } from '~/components/TabBar/TabBar';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import {
  ButtonContainer,
  CheckboxContainer,
  Container,
  CurrentLimitText,
  InputRow,
  LimitLabel,
  LimitTitle,
  ScrollContent,
  Section,
  TitleRow,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type LimitConfig = {
  id: string;
  title: string;
  currentLimit: string;
  newLimit: string;
  noLimit: boolean;
  setNewLimit: (value: string) => void;
  setNoLimit: (value: boolean) => void;
};

export const SetLimits = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'deposit' | 'stake'>('deposit');

  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [weeklyLimit, setWeeklyLimit] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');
  const [stakeLimit, setStakeLimit] = useState('');

  const [monthlyNoLimit, setMonthlyNoLimit] = useState(false);
  const [weeklyNoLimit, setWeeklyNoLimit] = useState(false);
  const [dailyNoLimit, setDailyNoLimit] = useState(false);
  const [stakeNoLimit, setStakeNoLimit] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Set Limits',
    });
  }, [navigation]);

  const depositLimits: LimitConfig[] = [
    {
      id: 'monthly',
      title: 'Monthly Limit',
      currentLimit: '0',
      newLimit: monthlyLimit,
      noLimit: monthlyNoLimit,
      setNewLimit: setMonthlyLimit,
      setNoLimit: setMonthlyNoLimit,
    },
    {
      id: 'weekly',
      title: 'Weekly Limit',
      currentLimit: '0',
      newLimit: weeklyLimit,
      noLimit: weeklyNoLimit,
      setNewLimit: setWeeklyLimit,
      setNoLimit: setWeeklyNoLimit,
    },
    {
      id: 'daily',
      title: 'Daily Limit',
      currentLimit: '0',
      newLimit: dailyLimit,
      noLimit: dailyNoLimit,
      setNewLimit: setDailyLimit,
      setNoLimit: setDailyNoLimit,
    },
  ];

  const stakeLimits: LimitConfig[] = [
    {
      id: 'stake',
      title: 'Stake Limit',
      currentLimit: '0',
      newLimit: stakeLimit,
      noLimit: stakeNoLimit,
      setNewLimit: setStakeLimit,
      setNoLimit: setStakeNoLimit,
    },
  ];

  const handleUpdate = () => {
    console.log('Update limits:', {
      activeTab,
      monthlyLimit: monthlyNoLimit ? null : monthlyLimit,
      weeklyLimit: weeklyNoLimit ? null : weeklyLimit,
      dailyLimit: dailyNoLimit ? null : dailyLimit,
      stakeLimit: stakeNoLimit ? null : stakeLimit,
    });
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

  const limits = activeTab === 'deposit' ? depositLimits : stakeLimits;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollContent style={{ flex: 1 }}>
          <TabBar
            tabs={[
              { id: 'deposit', label: 'Deposit' },
              { id: 'stake', label: 'Stake' },
            ]}
            activeTab={activeTab}
            onTabPress={(tabId) => setActiveTab(tabId as 'deposit' | 'stake')}
          />

          <Section>{limits.map(renderLimitCard)}</Section>
        </ScrollContent>
        <ButtonContainer>
          <Button variant="secondary" onPress={handleUpdate}>
            Update
          </Button>
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};
