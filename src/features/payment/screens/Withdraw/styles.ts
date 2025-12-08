import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const AmountContainer = styled.View`
  align-items: center;
  margin-top: 40px;
  margin-bottom: 16px;
`;

export const AmountText = styled.Text`
  font-size: 56px;
  font-weight: bold;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const AvailableText = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  margin-top: 32px;
  margin-bottom: 12px;
`;

export const PaymentMethodsCard = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  overflow: hidden;
`;

export const PaymentMethodItem = styled.Pressable<{ isFirst?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top-width: ${({ isFirst }: { isFirst?: boolean }) => (isFirst ? 0 : 1)}px;
  border-top-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
`;

export const PaymentMethodLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const PaymentMethodIcon = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

export const PaymentMethodInfo = styled.View`
  flex: 1;
`;

export const PaymentMethodName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const PaymentMethodLimit = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-top: 2px;
`;

export const InfoText = styled.Text`
  font-size: 12px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: 32px;
  line-height: 18px;
`;

export const QuickAmountRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  padding: 12px 0;
`;

export const QuickAmountButton = styled.Pressable`
  padding: 12px 0;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const QuickAmountText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const Spacer = styled.View`
  flex: 1;
`;

export const HeaderRight = styled.Pressable`
  padding: 8px;
`;

export const HeaderRightText = styled.Text`
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  font-weight: 500;
`;
