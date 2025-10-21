import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.primary};
  align-items: center;
  justify-content: space-between;
  padding: 60px 30px 30px 30px;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
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

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const PlaceholderImage = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  justify-content: center;
`;

export const PrizeContainer = styled.View`
  background-color: ${(props: any) => props.theme.colors.white};
  padding: 15px 25px;
  border-radius: 25px;
  margin-bottom: 15px;
`;

export const BadgeContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
`;
