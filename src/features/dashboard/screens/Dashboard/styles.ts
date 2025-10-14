import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
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
  padding-top: 4px;
  padding-bottom: 4px;
  align-self: stretch;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
`;
