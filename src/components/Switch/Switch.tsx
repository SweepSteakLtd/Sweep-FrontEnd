import { Switch as RNSwitch, type SwitchProps } from 'react-native';
import { useTheme } from 'styled-components/native';

type CustomSwitchProps = Omit<SwitchProps, 'trackColor' | 'thumbColor' | 'ios_backgroundColor'>;

export const Switch = ({ value, disabled, ...props }: CustomSwitchProps) => {
  const theme = useTheme();

  return (
    <RNSwitch
      value={value}
      disabled={disabled}
      trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      thumbColor={value ? theme.colors.white : theme.colors.textSecondary}
      {...props}
    />
  );
};
