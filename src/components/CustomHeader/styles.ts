import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const SafeAreaContainer = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const Container = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  min-height: 48px;
`;

export const LeftSection = styled.View`
  min-width: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const RightSection = styled.View`
  min-width: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  text-align: center;
  padding-horizontal: 8px;
`;

export const BackButton = styled.Pressable`
  padding-left: 0;
  padding-right: 16px;
  min-width: 44px;
  height: 44px;
  justify-content: center;
  align-items: flex-start;
`;

export const BackButtonText = styled.Text`
  font-size: 36px;
  font-weight: 300;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  line-height: 36px;
`;
