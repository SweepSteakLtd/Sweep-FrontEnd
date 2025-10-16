import React from 'react';
import { TextProps } from 'react-native';
import { IconText } from './styles';

interface IconProps extends TextProps {
  name: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, ...props }) => {
  return (
    <IconText size={size} {...props}>
      {name}
    </IconText>
  );
};
