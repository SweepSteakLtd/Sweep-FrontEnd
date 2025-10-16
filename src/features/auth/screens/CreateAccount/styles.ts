import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.primary};
  padding: 60px 30px 30px 30px;
`;

export const Header = styled.View`
  margin-bottom: 40px;
`;

export const OptionsContainer = styled.View`
  flex: 1;
  gap: 20px;
`;

export const OptionCard = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  flex-direction: row;
  align-items: flex-start;
`;

export const IconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${(props: any) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const OptionContent = styled.View`
  flex: 1;
`;
