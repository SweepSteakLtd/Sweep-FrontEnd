import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.primary};
  padding: 60px 30px 30px 30px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const LogoCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props: any) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const Header = styled.View`
  margin-bottom: 30px;
`;

export const FormContainer = styled.View`
  flex: 1;
`;
