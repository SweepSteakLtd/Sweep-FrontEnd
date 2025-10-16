import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 20px;
  padding-bottom: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
`;
