import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 8px 12px;
  flex: 1;
`;

export const SearchIcon = styled.Text`
  font-size: 16px;
  margin-right: 6px;
  opacity: 0.5;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.85);
  padding: 0;
`;
