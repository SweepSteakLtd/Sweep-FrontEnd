import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  padding: 20px 30px 30px 30px;
`;

<<<<<<< HEAD
export const LogoContainer = styled.View<{ theme: Theme }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const LogoCircle = styled.View<{ theme: Theme }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const Header = styled.View<{ theme: Theme }>`
  margin-bottom: 20px;
=======
export const Header = styled.View<{ theme: Theme }>`
  margin-bottom: 30px;
  align-items: center;
`;

export const HeaderText = styled.View<{ theme: Theme }>`
  margin-bottom: 20px;
`;

export const LogoContainer = styled.View<{ theme: Theme }>`
  align-items: center;
  justify-content: center;
`;

export const HeaderLogo = styled.Image<{ theme: Theme }>`
  width: 150px;
  height: 150px;
>>>>>>> update-chipin-branding
`;

export const FormContainer = styled.View<{ theme: Theme }>`
  width: 100%;
  padding-bottom: 20px;
`;
