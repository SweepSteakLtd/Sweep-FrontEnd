import styled from 'styled-components/native';

interface FloatingButtonProps {
  backgroundColor: string;
}

export const FloatingButton = styled.View<FloatingButtonProps>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ backgroundColor }: FloatingButtonProps) => backgroundColor};
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;
