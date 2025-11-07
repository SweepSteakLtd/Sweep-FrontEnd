import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PlusIconProps {
  size?: number;
  color?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ size = 24, color = 'white' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12H20M12 4V20"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
