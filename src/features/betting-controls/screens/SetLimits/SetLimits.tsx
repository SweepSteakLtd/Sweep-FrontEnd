import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import type { RootStackParamList } from '~/navigation/types';
import {
  ButtonContainer,
  Container,
  InputRow,
  LimitLabel,
  RemoveButton,
  RemoveButtonText,
  ScrollContent,
  Section,
  Tab,
  TabContainer,
  TabText,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SetLimits = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'deposit' | 'stake'>('deposit');

  const [monthlyLimit, setMonthlyLimit] = useState('0');
  const [weeklyLimit, setWeeklyLimit] = useState('0');
  const [dailyLimit, setDailyLimit] = useState('0');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Set Limits',
    });
  }, [navigation]);

  const handleUpdate = () => {
    console.log('Update limits:', { activeTab, monthlyLimit, weeklyLimit, dailyLimit });
  };

  const handleRemove = (limitType: string) => {
    console.log('Remove limit:', limitType);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundLight }}
      edges={['bottom']}
    >
      <Container>
        <ScrollContent style={{ flex: 1 }}>
          <TabContainer>
            <Tab active={activeTab === 'deposit'} onPress={() => setActiveTab('deposit')}>
              <TabText active={activeTab === 'deposit'}>Deposit</TabText>
            </Tab>
            <Tab active={activeTab === 'stake'} onPress={() => setActiveTab('stake')}>
              <TabText active={activeTab === 'stake'}>Stake</TabText>
            </Tab>
          </TabContainer>

          <Section>
            <InputRow>
              <LimitLabel>{activeTab === 'deposit' ? 'Monthly limit' : 'Stake limit'}</LimitLabel>
              <Input
                variant="currency"
                value={monthlyLimit}
                onChangeText={setMonthlyLimit}
                placeholder="0"
              />
              <RemoveButton onPress={() => handleRemove('monthly')}>
                <RemoveButtonText>Remove</RemoveButtonText>
              </RemoveButton>
            </InputRow>

            <InputRow>
              <LimitLabel>Weekly limit</LimitLabel>
              <Input
                variant="currency"
                value={weeklyLimit}
                onChangeText={setWeeklyLimit}
                placeholder="0"
              />
              <RemoveButton onPress={() => handleRemove('weekly')}>
                <RemoveButtonText>Remove</RemoveButtonText>
              </RemoveButton>
            </InputRow>

            <InputRow>
              <LimitLabel>Daily limit</LimitLabel>
              <Input
                variant="currency"
                value={dailyLimit}
                onChangeText={setDailyLimit}
                placeholder="0"
              />
              <RemoveButton onPress={() => handleRemove('daily')}>
                <RemoveButtonText>Remove</RemoveButtonText>
              </RemoveButton>
            </InputRow>
          </Section>
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
