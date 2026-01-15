import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, ImageSourcePropType, ScrollView } from 'react-native';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  AvailableText,
  Container,
  Content,
  HeaderRight,
  HeaderRightText,
  InfoText,
  PaymentMethodInfo,
  PaymentMethodItem,
  PaymentMethodLeft,
  PaymentMethodLimit,
  PaymentMethodName,
  PaymentMethodsCard,
  SectionTitle,
} from './styles';

interface PaymentMethod {
  id: string;
  name: string;
  logoUrl: ImageSourcePropType;
  maxLimit: number;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'monzo',
    name: 'Monzo -- 8105',
    logoUrl: require('../../../../../assets/images/payment/monzo-logo.png'),
    maxLimit: 10,
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    logoUrl: require('../../../../../assets/images/payment/apple-logo-black.png'),
    maxLimit: 5,
  },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Withdraw = () => {
  const navigation = useNavigation<NavigationProp>();
  const { data: user } = useGetUser();
  const availableBalance = user?.current_balance || 0;

  const [amount, setAmount] = useState('0');

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
              style={{ fontSize: 32, textAlign: 'center' }}
            />
            <AvailableText>£{availableBalance.toFixed(2)} available</AvailableText>

            <SectionTitle style={{ marginTop: 32 }}>Method</SectionTitle>
            <PaymentMethodsCard>
              {PAYMENT_METHODS.map((method, index) => (
                <PaymentMethodItem key={method.id} isFirst={index === 0} onPress={() => {}}>
                  <PaymentMethodLeft>
                    <Image
                      source={method.logoUrl}
                      style={{ width: 50, height: 32, marginRight: 12 }}
                      resizeMode="contain"
                    />
                    <PaymentMethodInfo>
                      <PaymentMethodName>{method.name}</PaymentMethodName>
                      <PaymentMethodLimit>Max £{method.maxLimit.toFixed(2)}</PaymentMethodLimit>
                    </PaymentMethodInfo>
                  </PaymentMethodLeft>
                </PaymentMethodItem>
              ))}
            </PaymentMethodsCard>

            <InfoText>Card withdrawals can take up to 24 hours.</InfoText>
          </Content>
          <ComplianceFooter />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
