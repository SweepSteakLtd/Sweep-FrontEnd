import React, { useMemo, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { Button } from '~/components/Button/Button';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import {
  ChangeButton,
  ChangeButtonText,
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
  const [amount, setAmount] = useState('20');
  const [paymentMethod] = useState('Apple Pay');

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
    // TODO: Navigate to payment confirmation or process payment
    console.log('Processing deposit:', amount, paymentMethod);
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
            <PaymentMethodCard onPress={() => {}}>
              <PaymentMethodLeft>
                <Image
                  source={require('../../../../../assets/images/payment/apple-logo-black.png')}
                  style={{ width: 50, height: 32, marginRight: 12 }}
                  resizeMode="contain"
                />
                <PaymentMethodText>{paymentMethod}</PaymentMethodText>
              </PaymentMethodLeft>
              <ChangeButton onPress={() => {}}>
                <ChangeButtonText>Change</ChangeButtonText>
              </ChangeButton>
            </PaymentMethodCard>

            <Button
              title="Continue"
              onPress={handleContinue}
              disabled={!validation.isValid}
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
