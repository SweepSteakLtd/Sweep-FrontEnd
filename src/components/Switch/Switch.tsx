import { Switch as RNSwitch, type SwitchProps } from 'react-native';
import { useTheme } from 'styled-components/native';

type CustomSwitchProps = Omit<SwitchProps, 'trackColor' | 'thumbColor' | 'ios_backgroundColor'> & {
  activeColor?: string;
};

export const Switch = ({ value, disabled, activeColor, ...props }: CustomSwitchProps) => {
  const theme = useTheme();

  return (
    <RNSwitch
      value={value}
      disabled={disabled}
      trackColor={{ false: theme.colors.border, true: activeColor || theme.colors.primary }}
      thumbColor={value ? theme.colors.white : theme.colors.textSecondary}
      {...props}
    />
  );
};
