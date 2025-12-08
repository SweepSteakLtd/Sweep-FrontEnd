import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const LimitCard = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const LimitTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
`;

export const CurrentLimitText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const InputRow = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.backgroundLight};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const LimitLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
