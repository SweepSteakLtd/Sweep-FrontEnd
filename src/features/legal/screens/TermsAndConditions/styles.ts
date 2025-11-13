import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.primary};
`;

export const Header = styled.View<{ theme: Theme }>`
  align-items: center;
  padding: 40px 20px 20px 20px;
`;

export const IconContainer = styled.View<{ theme: Theme }>`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const ScrollContainer = styled.ScrollView<{ theme: Theme }>`
  flex: 1;
  padding: 20px;
`;

export const ContentCard = styled.View<{ theme: Theme }>`
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Footer = styled.View<{ theme: Theme }>`
  padding: 20px;
`;
