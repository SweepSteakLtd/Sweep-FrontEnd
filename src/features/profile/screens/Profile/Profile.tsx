import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '~/components/Avatar/Avatar';
import { useAuth } from '~/contexts/AuthContext';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  ActionButton,
  ActionButtonText,
  BalanceAmount,
  BalanceCard,
  BalanceContainer,
  BalanceLabel,
  ButtonRow,
  Container,
  MenuItem,
  MenuItemArrow,
  MenuItemIcon,
  MenuItemText,
  MenuSection,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Profile = () => {
  const navigation = useNavigation<NavigationProp>();
  const { signOut } = useAuth();
  const { data: user } = useGetUser();

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Profile',
    });
  }, [navigation]);

  const formatBalance = (balance?: number) => {
    if (balance === undefined || balance === null) return '£0.00';
    return `£${balance.toFixed(2)}`;
  };

  const handleLogout = async () => {
    await signOut();
    navigation.navigate('Landing');
  };

  const menuItems = [
    { icon: '👥', label: 'My Teams', onPress: () => {} },
    { icon: '🏆', label: 'My Leagues', onPress: () => {} },
    { icon: '👤', label: 'Account details', onPress: () => navigation.navigate('AccountDetails') },
    { icon: '🔒', label: 'Security', onPress: () => navigation.navigate('Security') },
    { icon: '🎰', label: 'Betting Controls', onPress: () => {} },
    { icon: '📊', label: 'Activity', onPress: () => {} },
    { icon: '❓', label: 'Support', onPress: () => {} },
    { icon: '📄', label: 'Legal', onPress: () => {} },
    { icon: '🚪', label: 'Sign out', onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <BalanceCard>
            <Avatar size={80} />
            <BalanceContainer>
              <BalanceAmount>{formatBalance(user?.current_balance)}</BalanceAmount>
              <BalanceLabel>Balance</BalanceLabel>
            </BalanceContainer>
            <ButtonRow>
              <ActionButton variant="primary" activeOpacity={0.8}>
                <ActionButtonText variant="primary">Top Up</ActionButtonText>
              </ActionButton>
              <ActionButton variant="secondary" activeOpacity={0.8}>
                <ActionButtonText variant="secondary">Withdraw</ActionButtonText>
              </ActionButton>
            </ButtonRow>
          </BalanceCard>

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
