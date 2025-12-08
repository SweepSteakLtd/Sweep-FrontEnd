import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  padding-bottom: ${Platform.OS === 'android' ? '20px' : '0px'};
`;

export const ProfileButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  min-width: 44px;
  min-height: 44px;
`;

export const ProfileBalance = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;
