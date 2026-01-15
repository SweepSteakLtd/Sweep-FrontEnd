import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, ScrollView } from 'react-native';
import { Button } from '~/components/Button/Button';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { useInitiateWithdrawal } from '~/services/apis/Payment';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  AvailableText,
  Container,
  Content,
  HeaderRight,
  HeaderRightText,
  InfoText,
  SectionTitle,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MIN_WITHDRAWAL = 5;
const MAX_WITHDRAWAL = 10000;

export const Withdraw = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: user } = useGetUser();
  const availableBalance = user?.current_balance || 0;

  const [amount, setAmount] = useState('0');

  const { mutate: initiateWithdrawal, isPending: isInitiating } = useInitiateWithdrawal();

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const validation = useMemo(() => {
    const amountNum = parseFloat(amount);

    if (isNaN(amountNum) || amountNum <= 0) {
      return { isValid: false, error: 'Please enter a valid amount' };
    }
    if (amountNum < MIN_WITHDRAWAL) {
      return { isValid: false, error: `Minimum withdrawal is £${MIN_WITHDRAWAL}` };
    }
    if (amountNum > MAX_WITHDRAWAL) {
      return { isValid: false, error: `Maximum withdrawal is £${MAX_WITHDRAWAL}` };
    }
    if (amountNum > availableBalance) {
      return { isValid: false, error: 'Insufficient balance' };
    }
    return { isValid: true, error: undefined };
  }, [amount, availableBalance]);

  const handleContinue = () => {
    if (!validation.isValid) return;

    const amountInPounds = parseFloat(amount);
    const amountInPence = Math.round(amountInPounds * 100); // Convert to pence

    // Step 1: Initiate withdrawal (create pending transaction)
    initiateWithdrawal(
      {
        amount: amountInPence,
        currency: 'GBP',
      },
      {
        onSuccess: (response) => {
          console.log('Withdrawal initiated:', response.data.transactionId);

          // Step 2: Navigate to PaymentCheckout screen
          navigation.navigate('PaymentCheckout', {
            transactionId: response.data.transactionId,
            amount: amountInPounds,
            currency: 'GBP',
            type: 'withdrawal',
          });
        },
        onError: (error: any) => {
          console.error('Failed to initiate withdrawal:', error);

          // Show user-friendly error message
          let errorMessage = 'Failed to initiate withdrawal. Please try again.';
          if (error?.message) {
            errorMessage = error.message;
          }

          Alert.alert('Withdrawal Error', errorMessage, [{ text: 'OK', style: 'default' }]);
        },
      },
    );
  };

  return (
    <ScreenWrapper
      title="Withdraw funds"
      rightComponent={
        <HeaderRight onPress={() => {}}>
          <HeaderRightText>Net deposits?</HeaderRightText>
        </HeaderRight>
      }
    >
      <Container>
        <ScrollView contentContainerStyle={{ padding: 24 }} showsVerticalScrollIndicator={false}>
          <Content>
            <SectionTitle>Amount</SectionTitle>
            <Input
              variant="currency"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="decimal-pad"
              error={validation.error}
              style={{ fontSize: 32, textAlign: 'center' }}
            />
            <AvailableText>£{availableBalance.toFixed(2)} available</AvailableText>

            <InfoText style={{ marginTop: 32 }}>
              Card withdrawals can take up to 24 hours. Min £{MIN_WITHDRAWAL} - Max: £
              {MAX_WITHDRAWAL}
            </InfoText>

            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!validation.isValid || isInitiating}
              loading={isInitiating}
              fullWidth
              style={{ marginTop: 40 }}
            />
          </Content>
          <ComplianceFooter />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
