import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { RootStackParamList } from '~/navigation/types';
import { Button } from '../Button/Button';
import { Container, InlineContainer } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DevMockButtonProps {
  /** Position style - 'absolute' positions at bottom, 'inline' renders in place */
  position?: 'absolute' | 'inline';
  /** Additional styles for the container */
  style?: StyleProp<ViewStyle>;
}

/**
 * Button to access Mock APIs settings
 *
 * Usage:
 * ```tsx
 * <DevMockButton />
 * ```
 */
export const DevMockButton: React.FC<DevMockButtonProps> = ({ position = 'absolute', style }) => {
  const navigation = useNavigation<NavigationProp>();

  const button = (
    <Button variant="link" title="Mock APIs" onPress={() => navigation.navigate('Settings')} />
  );

  if (position === 'inline') {
    return <InlineContainer style={style}>{button}</InlineContainer>;
  }

  return <Container style={style}>{button}</Container>;
};
