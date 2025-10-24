import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.primary};
  padding: 60px 30px 30px 30px;
`;

export const LogoContainer = styled.View<{ theme: Theme }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const LogoCircle = styled.View<{ theme: Theme }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Header = styled.View<{ theme: Theme }>`
  margin-bottom: 30px;
`;

export const FormContainer = styled.View<{ theme: Theme }>`
  width: 100%;
`;
