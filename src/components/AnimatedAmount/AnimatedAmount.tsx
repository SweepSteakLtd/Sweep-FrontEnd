import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PlaceholderText, StyledAnimatedText, Wrapper } from './styles';

type TypographyVariant = 'title' | 'heading' | 'subheading' | 'body' | 'caption' | 'label';

interface AnimatedAmountProps extends Omit<TextProps, 'children'> {
  value: number;
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | '600';
  duration?: number;
  startValue?: number;
  currencySymbol?: string;
  decimals?: number;
}

const formatCurrency = (value: number, symbol: string, decimals: number): string => {
  const formatted = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${symbol}${formatted}`;
};

export const AnimatedAmount: React.FC<AnimatedAmountProps> = ({
  value,
  variant = 'heading',
  color,
  align = 'left',
  weight,
  duration = 1000,
  startValue,
  currencySymbol = '£',
  decimals = 0,
  ...props
}) => {
  const theme = useTheme();
  const defaultColor = color || theme.colors.text.primary;
  const calculatedStartValue = startValue ?? value * 0.5;
  const animatedValue = useRef(new Animated.Value(calculatedStartValue)).current;
  const [displayValue, setDisplayValue] = React.useState(
    formatCurrency(calculatedStartValue, currencySymbol, decimals),
  );

  // Pre-calculate final formatted value to reserve space
  const finalFormattedValue = useMemo(
    () => formatCurrency(value, currencySymbol, decimals),
    [value, currencySymbol, decimals],
  );

  useEffect(() => {
    // Set up listener to update display value as animation progresses
    const listenerId = animatedValue.addListener(({ value: currentValue }) => {
      setDisplayValue(formatCurrency(currentValue, currencySymbol, decimals));
    });

    // Animate to final value
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false, // Can't use native driver for value interpolation
    }).start();

    // Cleanup listener on unmount
    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [value, duration, currencySymbol, decimals, animatedValue]);

  return (
    <Wrapper align={align}>
      {/* Invisible placeholder to reserve space for final value */}
      <PlaceholderText
        variant={variant}
        color={defaultColor}
        align={align}
        weight={weight}
        {...props}
      >
        {finalFormattedValue}
      </PlaceholderText>

      {/* Visible animated value */}
      <StyledAnimatedText
        variant={variant}
        color={defaultColor}
        align={align}
        weight={weight}
        {...props}
      >
        {displayValue}
      </StyledAnimatedText>
    </Wrapper>
  );
};
