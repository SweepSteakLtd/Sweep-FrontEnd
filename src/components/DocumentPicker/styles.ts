import { Dimensions, TouchableOpacity } from 'react-native';
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
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.backgroundLight};
  padding: 12px;
  border-radius: 12px;
  align-self: flex-start;
  align-items: center;
`;

export const PickerButtonsRow = styled.View`
  flex-direction: row;
  gap: 16px;
`;

export const PickerButton = styled(TouchableOpacity)<{ $disabled?: boolean }>`
  width: 44px;
  height: 44px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }: { $disabled?: boolean }) => ($disabled ? 0.5 : 1)};
`;

export const IconText = styled.Text`
  font-size: 20px;
`;

export const PickerHelpText = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  font-size: 10px;
  margin-top: 8px;
  line-height: 14px;
  text-align: center;
`;

export const PickerHelpTextBold = styled.Text`
  font-weight: 600;
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

// Multi-image grid styles
export const ImagesGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const ImageThumbnailContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
`;

export const ImageThumbnail = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ThumbnailRemoveButton = styled(TouchableOpacity)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

export const ThumbnailRemoveText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

export const AddMoreButton = styled(TouchableOpacity)<{ $disabled?: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  border: 1px dashed ${({ theme }: { theme: DefaultTheme }) => theme.colors.border};
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }: { $disabled?: boolean }) => ($disabled ? 0.5 : 1)};
`;

export const AddMoreIcon = styled.Text`
  font-size: 24px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
`;

export const AddMoreLabel = styled(Typography)`
  font-size: 10px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  margin-top: 4px;
`;

export const ImageCountText = styled(Typography)`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.text.secondary};
  font-size: 12px;
  margin-top: 8px;
`;

// ImageGalleryModal styles
export const GalleryContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.background};
`;

export const GalleryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

export const GalleryHeaderButton = styled(TouchableOpacity)`
  padding: 8px;
  min-width: 60px;
`;

export const GalleryHeaderPlaceholder = styled.View`
  padding: 8px;
  min-width: 60px;
`;

export const GalleryImageContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  justify-content: center;
  align-items: center;
`;

export const GalleryPagination = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  gap: 8px;
`;

export const GalleryDot = styled.View<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, $active }: { theme: DefaultTheme; $active?: boolean }) =>
    $active ? theme.colors.primary : theme.colors.text.tertiary};
`;

export const GalleryImage = styled.Image<{ $width: number; $height: number }>`
  width: ${({ $width }: { $width: number }) => $width}px;
  height: ${({ $height }: { $height: number }) => $height}px;
  border-radius: 8px;
  background-color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.card};
`;
