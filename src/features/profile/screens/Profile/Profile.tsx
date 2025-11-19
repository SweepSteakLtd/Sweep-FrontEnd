import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Avatar } from '~/components/Avatar/Avatar';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useAuth } from '~/contexts/AuthContext';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { formatCurrency } from '~/utils/currency';
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
  const theme = useTheme();
  const { signOut } = useAuth();
  const { data: user, refetch } = useGetUser();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigation.navigate('Login');
  };

  const menuItems = [
    { icon: '👤', label: 'Account Details', onPress: () => navigation.navigate('AccountDetails') },
    { icon: '👥', label: 'My Teams', onPress: () => navigation.navigate('MyTeams') },
    { icon: '🏆', label: 'My Leagues', onPress: () => navigation.navigate('MyLeagues') },
    { icon: '📊', label: 'Activity', onPress: () => navigation.navigate('Activity') },
    { icon: '🔒', label: 'Change Password', onPress: () => navigation.navigate('Security') },
    {
      icon: '🎰',
      label: 'Betting Controls',
      onPress: () => navigation.navigate('BettingControls'),
    },
    { icon: '❓', label: 'Support', onPress: () => {} },
    { icon: '📄', label: 'Legal', onPress: () => {} },
    { icon: '⏻', label: 'Sign out', onPress: handleLogout },
    { icon: '⚙️', label: 'API Mocks', onPress: () => navigation.navigate('Settings') },
  ];

  return (
    <ScreenWrapper title="Profile">
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        >
          <BalanceCard>
            <Avatar size={80} />
            <BalanceContainer>
              <BalanceAmount>{formatCurrency(user?.current_balance)}</BalanceAmount>
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

          <ComplianceFooter />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
