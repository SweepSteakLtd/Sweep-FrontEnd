import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  padding: 60px 30px 30px 30px;
`;

export const Header = styled.View<{ theme: Theme }>`
  margin-bottom: 30px;
  margin-top: 40px;
  align-items: center;
`;

export const LogoContainer = styled.View<{ theme: Theme }>`
  align-items: center;
  justify-content: center;
`;

export const HeaderLogo = styled.Image<{ theme: Theme }>`
  width: 150px;
  height: 150px;
`;

export const FormContainer = styled.View<{ theme: Theme }>`
  width: 100%;
`;

export const ContentWrapper = styled.View<{ theme: Theme }>`
  flex: 1;
`;
