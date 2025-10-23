import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { BackIcon } from './styles';

interface BackButtonProps {
  onPress?: () => void;
  tintColor?: string;
}

export const BackButton = ({ onPress, tintColor }: BackButtonProps) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ paddingLeft: 8, paddingRight: 16 }}>
      <BackIcon color={tintColor || theme.colors.white}>‹</BackIcon>
    </TouchableOpacity>
  );
};
