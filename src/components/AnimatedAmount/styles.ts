import styled from 'styled-components/native';

type TypographyVariant = 'title' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';

export const getStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case 'title':
      return {
        fontSize: 32,
        fontWeight: 'bold' as const,
        lineHeight: 38,
      };
    case 'heading':
      return {
        fontSize: 28,
        fontWeight: 'bold' as const,
        lineHeight: 34,
      };
    case 'subheading':
      return {
        fontSize: 20,
        fontWeight: '600' as const,
        lineHeight: 26,
      };
    case 'body':
      return {
        fontSize: 16,
        fontWeight: 'normal' as const,
        lineHeight: 22,
      };
    case 'caption':
      return {
        fontSize: 14,
        fontWeight: 'normal' as const,
        lineHeight: 18,
      };
    case 'label':
      return {
        fontSize: 16,
        fontWeight: '600' as const,
        lineHeight: 20,
      };
    default:
      return {
        fontSize: 16,
        fontWeight: 'normal' as const,
        lineHeight: 22,
      };
  }
};

interface WrapperProps {
  align: 'left' | 'center' | 'right';
}

export const Wrapper = styled.View<WrapperProps>`
  position: relative;
  overflow: hidden;
  align-self: ${(props: WrapperProps) => {
    switch (props.align) {
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'flex-start';
    }
  }};
`;

interface StyledAnimatedTextProps {
  variant: TypographyVariant;
  color: string;
  align: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
}

const BaseText = styled.Text<StyledAnimatedTextProps>`
  color: ${(props: StyledAnimatedTextProps) => props.color};
  font-size: ${(props: StyledAnimatedTextProps) => getStyles(props.variant).fontSize}px;
  font-weight: ${(props: StyledAnimatedTextProps) => props.weight || getStyles(props.variant).fontWeight};
  line-height: ${(props: StyledAnimatedTextProps) => getStyles(props.variant).lineHeight}px;
  text-align: ${(props: StyledAnimatedTextProps) => props.align};
  font-variant-numeric: tabular-nums;
  include-font-padding: false;
`;

export const PlaceholderText = styled(BaseText)`
  opacity: 0;
`;

export const StyledAnimatedText = styled(BaseText)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
