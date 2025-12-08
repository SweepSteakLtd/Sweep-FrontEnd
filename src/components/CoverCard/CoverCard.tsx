import { ReactNode } from 'react';
import { Card, CardWrapper, CoverImage, Overlay, Subtitle, Title } from './styles';

export interface CoverCardProps {
  imageUri?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  height?: number;
  children?: ReactNode;
  titleSize?: number;
  titleWeight?: '400' | '500' | '600' | '700';
  overlayPadding?: number;
}

export const CoverCard = ({
  imageUri,
  title,
  subtitle,
  onPress,
  height = 180,
  children,
  titleSize = 18,
  titleWeight = '700',
  overlayPadding = 16,
}: CoverCardProps) => {
  const defaultImage =
    imageUri || 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=400&fit=crop';

  return (
    <CardWrapper>
      <Card onPress={onPress} activeOpacity={onPress ? 0.8 : 1} disabled={!onPress} height={height}>
        <CoverImage source={{ uri: defaultImage }} resizeMode="cover" />
        <Overlay padding={overlayPadding}>
          {children ? (
            children
          ) : (
            <>
              <Title fontSize={titleSize} fontWeight={titleWeight}>
                {title}
              </Title>
              {subtitle && <Subtitle numberOfLines={2}>{subtitle}</Subtitle>}
            </>
          )}
        </Overlay>
      </Card>
    </CardWrapper>
  );
};
