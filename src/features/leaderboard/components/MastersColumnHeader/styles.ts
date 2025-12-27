import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ primaryColor?: string }>`
  background-color: ${({ primaryColor }: { primaryColor?: string }) =>
    primaryColor || '#336600'};
  padding: 6px 16px;
  width: 100%;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RoundBox = styled.View`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 4px 12px;
  position: absolute;
  align-self: center;
  left: 50%;
  margin-left: -60px;
  width: 120px;
`;

export const RoundText = styled.Text<{ primaryColor?: string }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ primaryColor }: { primaryColor?: string }) => primaryColor || '#336600'};
  text-align: center;
`;

export const ColumnHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const ColumnText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  text-transform: uppercase;
`;

export const NameText = styled(ColumnText)`
  flex: 1;
`;

export const ScoreText = styled(ColumnText)`
  text-align: right;
  min-width: 60px;
`;

