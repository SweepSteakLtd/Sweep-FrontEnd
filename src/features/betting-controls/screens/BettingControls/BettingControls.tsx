import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import type { RootStackParamList } from '~/navigation/types';
import {
  Container,
  MenuItem,
  MenuItemArrow,
  MenuItemIcon,
  MenuItemText,
  MenuSection,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type MenuItemConfig = {
  icon: string;
  label: string;
  onPress: () => void;
};

export const BettingControls = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Betting Controls',
    });
  }, [navigation]);

  const menuItems: MenuItemConfig[] = [
    {
      icon: '💰',
      label: 'Set Limits',
      onPress: () => navigation.navigate('SetLimits'),
    },
    {
      icon: 'ℹ️',
      label: 'Spend Limits',
      onPress: () => navigation.navigate('SpendLimit'),
    },
    {
      icon: '🛡️',
      label: 'Self Exclude',
      onPress: () => navigation.navigate('SelfExclusion'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <MenuSection>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onPress={item.onPress}
                activeOpacity={0.7}
                style={{ borderBottomWidth: index === menuItems.length - 1 ? 0 : 1 }}
              >
                <MenuItemIcon>{item.icon}</MenuItemIcon>
                <MenuItemText>{item.label}</MenuItemText>
                <MenuItemArrow>›</MenuItemArrow>
              </MenuItem>
            ))}
          </MenuSection>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};
