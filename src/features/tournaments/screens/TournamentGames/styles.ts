import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;

export const CreateButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;

export const CreateButtonText = styled.Text`
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  line-height: 24px;
`;

export const PotInfo = styled.View`
  padding: 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
  align-items: center;
`;

export const PotLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

export const SegmentedTabWrapper = styled.View`
  padding: 12px 20px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.background};
`;
