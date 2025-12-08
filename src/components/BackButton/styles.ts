import styled from 'styled-components/native';

export const BackIcon = styled.Text<{ color: string }>`
  font-size: 34px;
  font-weight: 400;
  color: ${({ color }: { color: string }) => color};
  line-height: 34px;
`;
