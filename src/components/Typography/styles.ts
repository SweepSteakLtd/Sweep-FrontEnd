import styled from 'styled-components/native';

type TypographyVariant = 'title' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';

export const getStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case 'title':
      return {
        fontSize: 28,
        fontWeight: 'bold' as const,
        lineHeight: 34,
      };
    case 'heading':
      return {
        fontSize: 24,
        fontWeight: 'bold' as const,
        lineHeight: 30,
      };
    case 'subheading':
      return {
        fontSize: 18,
        fontWeight: '600' as const,
        lineHeight: 24,
      };
    case 'body':
      return {
        fontSize: 14,
        fontWeight: 'normal' as const,
        lineHeight: 20,
      };
    case 'caption':
      return {
        fontSize: 12,
        fontWeight: 'normal' as const,
        lineHeight: 16,
      };
    case 'label':
      return {
        fontSize: 14,
        fontWeight: '600' as const,
        lineHeight: 18,
      };
    default:
      return {
        fontSize: 14,
        fontWeight: 'normal' as const,
        lineHeight: 20,
      };
  }
};

interface StyledTextProps {
  variant: TypographyVariant;
  color: string;
  align: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
}

export const StyledText = styled.Text<StyledTextProps>`
  color: ${(props: StyledTextProps) => props.color};
  font-size: ${(props: StyledTextProps) => getStyles(props.variant).fontSize}px;
  font-weight: ${(props: StyledTextProps) => props.weight || getStyles(props.variant).fontWeight};
  line-height: ${(props: StyledTextProps) => getStyles(props.variant).lineHeight}px;
  text-align: ${(props: StyledTextProps) => props.align};
`;
