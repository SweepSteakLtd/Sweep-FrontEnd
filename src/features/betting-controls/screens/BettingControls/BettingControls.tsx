import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView } from 'react-native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
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

  const menuItems: MenuItemConfig[] = [
    {
      icon: '💰',
      label: 'Deposit Limits',
      onPress: () => navigation.navigate('DepositLimits'),
    },
    {
      icon: '🎯',
      label: 'Stake Limits',
      onPress: () => navigation.navigate('StakeLimits'),
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
    <ScreenWrapper title="Betting Controls">
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
    </ScreenWrapper>
  );
};
