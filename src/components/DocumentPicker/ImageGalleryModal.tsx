import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Modal, SafeAreaView, ViewToken } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '../Typography/Typography';
import {
  GalleryContainer,
  GalleryDot,
  GalleryHeader,
  GalleryHeaderButton,
  GalleryHeaderPlaceholder,
  GalleryImage,
  GalleryImageContainer,
  GalleryPagination,
} from './styles';
import type { PickedFile } from './useDocumentPicker';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ImageGalleryModalProps {
  visible: boolean;
  images: PickedFile[];
  initialIndex: number;
  onClose: () => void;
  onDelete?: (index: number) => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  images,
  initialIndex,
  onClose,
  onDelete,
}) => {
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when modal opens with new initialIndex
  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  const handleViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(currentIndex);
      // If we deleted the last image, close the modal
      if (images.length <= 1) {
        onClose();
      }
    }
  };

  const renderImage = ({ item }: { item: PickedFile }) => (
    <GalleryImageContainer>
      <ImageComponent uri={item.uri} />
    </GalleryImageContainer>
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <GalleryContainer>
          {/* Header */}
          <GalleryHeader>
            <GalleryHeaderButton onPress={onClose}>
              <Typography variant="body" style={{ color: theme.colors.text.primary }}>
                Close
              </Typography>
            </GalleryHeaderButton>

            <Typography variant="body" style={{ color: theme.colors.text.primary }}>
              {currentIndex + 1} / {images.length}
            </Typography>

            {onDelete ? (
              <GalleryHeaderButton onPress={handleDelete}>
                <Typography variant="body" style={{ color: theme.colors.error }}>
                  Delete
                </Typography>
              </GalleryHeaderButton>
            ) : (
              <GalleryHeaderPlaceholder />
            )}
          </GalleryHeader>

          {/* Image Gallery */}
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderImage}
            keyExtractor={(item, index) => `${item.uri}-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialIndex}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />

          {/* Pagination dots */}
          {images.length > 1 && (
            <GalleryPagination>
              {images.map((_, index) => (
                <GalleryDot key={index} $active={index === currentIndex} />
              ))}
            </GalleryPagination>
          )}
        </GalleryContainer>
      </SafeAreaView>
    </Modal>
  );
};

// Separate image component to handle the actual image rendering
const ImageComponent: React.FC<{ uri: string }> = ({ uri }) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    Image.getSize(
      uri,
      (width: number, height: number) => {
        setAspectRatio(width / height);
      },
      () => {
        // Error getting size, use default
        setAspectRatio(1);
      },
    );
  }, [uri]);

  // Calculate dimensions to fit within screen while maintaining aspect ratio
  const maxWidth = SCREEN_WIDTH - 32;
  const maxHeight = SCREEN_HEIGHT * 0.65;

  let imageWidth = maxWidth;
  let imageHeight = maxWidth / aspectRatio;

  if (imageHeight > maxHeight) {
    imageHeight = maxHeight;
    imageWidth = maxHeight * aspectRatio;
  }

  return (
    <GalleryImage source={{ uri }} $width={imageWidth} $height={imageHeight} resizeMode="contain" />
  );
};
