import { TouchableOpacity } from 'react-native';
import type { DefaultTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { Typography } from '../Typography/Typography';

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const Label = styled(Typography)`
  margin-bottom: 8px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
`;

export const PickerContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const PickerButton = styled(TouchableOpacity)<{ $disabled?: boolean }>`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
  border: 1px dashed ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px 16px;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }: { $disabled?: boolean }) => ($disabled ? 0.5 : 1)};
`;

export const IconText = styled.Text`
  font-size: 32px;
  margin-bottom: 8px;
`;

export const ButtonLabel = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  text-align: center;
`;

export const SelectedFileContainer = styled.View`
  margin-top: 12px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
  border-radius: 8px;
  padding: 12px;
  flex-direction: row;
  align-items: center;
`;

export const FileIcon = styled.Text`
  font-size: 24px;
  margin-right: 12px;
`;

export const FileInfo = styled.View`
  flex: 1;
`;

export const FileName = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const FileSize = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const RemoveButton = styled(TouchableOpacity)`
  padding: 8px;
`;

export const RemoveText = styled.Text`
  font-size: 18px;
`;

export const PreviewContainer = styled.View`
  margin-top: 12px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
`;

export const PreviewImage = styled.Image`
  width: 100%;
  height: 200px;
`;

export const PreviewOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 12px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const PreviewFileInfo = styled.View`
  flex: 1;
`;

export const PreviewFileName = styled(Typography)`
  color: #ffffff;
  font-size: 14px;
`;

export const PreviewFileSize = styled(Typography)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
`;

export const PreviewRemoveButton = styled(TouchableOpacity)`
  padding: 4px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;

export const PreviewRemoveText = styled(Typography)`
  color: #ffffff;
  font-size: 12px;
`;

export const DocumentPreview = styled.View`
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

export const DocumentIcon = styled.Text`
  font-size: 64px;
  margin-bottom: 12px;
`;
