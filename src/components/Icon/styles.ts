import styled from 'styled-components/native';

interface IconTextProps {
  size: number;
}

export const IconText = styled.Text<IconTextProps>`
  font-size: ${(props: IconTextProps) => props.size}px;
`;
