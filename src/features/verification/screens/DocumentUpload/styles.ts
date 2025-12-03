import styled from 'styled-components/native';
import type { Theme } from '~/theme/theme';

export const Container = styled.View<{ theme: Theme }>`
  flex: 1;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
`;

export const HeaderSection = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text<{ theme: Theme }>`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: { theme: Theme }) => props.theme.colors.text.primary};
  margin-bottom: 8px;
`;

export const Subtitle = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  color: ${(props: { theme: Theme }) => props.theme.colors.text.secondary};
  line-height: 20px;
`;

export const RequirementsList = styled.View`
  margin-top: 16px;
  padding: 16px;
  background-color: ${(props: { theme: Theme }) => props.theme.colors.card};
  border-radius: 12px;
`;

export const RequirementItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const RequirementIcon = styled.Text`
  font-size: 14px;
  margin-right: 8px;
`;

export const RequirementText = styled.Text<{ theme: Theme }>`
  font-size: 13px;
  color: ${(props: { theme: Theme }) => props.theme.colors.text.secondary};
  flex: 1;
`;

export const PickerSection = styled.View`
  margin-top: 24px;
`;

export const ButtonSection = styled.View`
  padding: 24px;
`;

export const ErrorText = styled.Text<{ theme: Theme }>`
  font-size: 14px;
  color: ${(props: { theme: Theme }) => props.theme.colors.error};
  text-align: center;
  margin-bottom: 16px;
`;
