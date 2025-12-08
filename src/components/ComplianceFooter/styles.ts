import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View`
  padding: 16px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  opacity: 0.2;
  margin-bottom: 16px;
`;

export const Section = styled.View`
  align-items: center;
`;

export const LicenceNumber = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 4px;
`;

export const CompanyNumber = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  margin-bottom: 4px;
`;

export const BuildNumber = styled.Text`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
`;

export const LogoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
`;

export const Logo = styled.Image`
  width: 50px;
  height: 30px;
`;

export const Link = styled.TouchableOpacity`
  padding: 4px 0;
`;
