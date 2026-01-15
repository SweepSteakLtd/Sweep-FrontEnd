import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, ScrollView } from 'react-native';
import { Button } from '~/components/Button/Button';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { useInitiatePayment } from '~/services/apis/Payment';
import {
  Container,
  Content,
  HeaderRight,
  HeaderRightText,
  LimitsText,
  PaymentMethodCard,
  PaymentMethodLeft,
  PaymentMethodText,
  SectionTitle,
} from './styles';
import { depositSchema, MAX_AMOUNT, MIN_AMOUNT } from './validation';

export const Deposit = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [amount, setAmount] = useState('20');
  const [paymentMethod] = useState('Paysafe Checkout');

  const { mutate: initiatePayment, isPending: isInitiating } = useInitiatePayment();

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
    const result = depositSchema.safeParse({ amount });
    if (result.success) {
      return { isValid: true, error: undefined };
    }
    const firstError = result.error?.issues?.[0]?.message;
    return { isValid: false, error: firstError };
  }, [amount]);

  const handleContinue = () => {
    if (!validation.isValid) return;

    const amountInPounds = parseFloat(amount);
    const amountInPence = Math.round(amountInPounds * 100); // Convert to pence

    // Step 1: Initiate payment (create pending transaction)
    initiatePayment(
      {
        amount: amountInPence,
        currency: 'GBP',
      },
      {
        onSuccess: (response) => {
          console.log('Payment initiated:', response.data.transactionId);

          // Step 2: Navigate to PaymentCheckout screen
          navigation.navigate('PaymentCheckout', {
            transactionId: response.data.transactionId,
            amount: amountInPounds,
            currency: 'GBP',
            type: 'deposit',
          });
        },
        onError: (error: any) => {
          console.error('Failed to initiate payment:', error);

          // Show user-friendly error message
          let errorMessage = 'Failed to initiate payment. Please try again.';
          if (error?.message) {
            errorMessage = error.message;
          }

          Alert.alert('Payment Error', errorMessage, [{ text: 'OK', style: 'default' }]);
        },
      },
    );
  };

  return (
    <ScreenWrapper
      title="Top up your account"
      rightComponent={
        <HeaderRight onPress={() => {}}>
          <HeaderRightText>Limits</HeaderRightText>
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
            <LimitsText>
              Min £{MIN_AMOUNT} - Max: £{MAX_AMOUNT}
            </LimitsText>

            <SectionTitle style={{ marginTop: 32 }}>Payment Method</SectionTitle>
            <PaymentMethodCard>
              <PaymentMethodLeft>
                <PaymentMethodText>{paymentMethod}</PaymentMethodText>
              </PaymentMethodLeft>
            </PaymentMethodCard>

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
