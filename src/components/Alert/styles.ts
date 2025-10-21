import styled from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const AlertContainer = styled.View`
  background-color: ${(props: any) => props.theme.colors.white};
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 8;
`;

export const AlertTitle = styled.View`
  margin-bottom: 12px;
`;

export const AlertMessage = styled.View`
  margin-bottom: 24px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
