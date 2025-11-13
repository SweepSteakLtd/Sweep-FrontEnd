import type { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '~/navigation/types';

interface AlertOptions {
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
}

export const useAlert = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showAlert = (options: AlertOptions) => {
    navigation.navigate('AlertModal', options);
  };

  return { showAlert };
};
