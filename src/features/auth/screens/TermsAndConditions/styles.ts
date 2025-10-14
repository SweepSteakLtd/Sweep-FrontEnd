import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.primary};
`;

export const Header = styled.View`
  align-items: center;
  padding: 40px 20px 20px 20px;
`;

export const IconContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const ContentCard = styled.View`
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Footer = styled.View`
  padding: 20px;
  background-color: ${(props: any) => props.theme.colors.primary};
`;
