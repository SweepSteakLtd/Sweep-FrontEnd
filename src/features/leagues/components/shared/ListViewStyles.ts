import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  shadow-color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
  elevation: 2;
  overflow: hidden;
`;

export const SectionHeader = styled.View<{ theme: Theme }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.border};
  padding: 12px;
  margin: -16px -16px 16px -16px;
`;

export const SectionTitle = styled.Text<{ theme: Theme }>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.accent};
`;

export const ContentContainer = styled.View<{ theme: Theme }>`
  gap: 16px;
`;

export const ListItem = styled.View<{ theme: Theme }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const NumberBadge = styled.View<{ theme: Theme }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.accent};
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

export const NumberText = styled.Text<{ theme: Theme }>`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
`;

export const ItemText = styled.Text<{ theme: Theme }>`
  flex: 1;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.accent};
`;
