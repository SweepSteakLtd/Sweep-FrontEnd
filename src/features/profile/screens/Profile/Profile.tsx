import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler, RefreshControl, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Avatar } from '~/components/Avatar/Avatar';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { DevMockButton } from '~/components/DevMockButton/DevMockButton';
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
  const { showAlert } = useAlert();
  const { data: user, refetch } = useGetUser();
  const [refreshing, setRefreshing] = useState(false);

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleLogout = () => {
    showAlert({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await signOut();
            navigation.navigate('Login');
          },
        },
      ],
    });
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
    { icon: '❓', label: 'Support', onPress: () => navigation.navigate('Support') },
    { icon: '📄', label: 'Legal', onPress: () => navigation.navigate('Legal') },
    { icon: '⏻', label: 'Sign out', onPress: handleLogout },
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
              <ActionButton
                variant="primary"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Deposit')}
              >
                <ActionButtonText variant="primary">Top Up</ActionButtonText>
              </ActionButton>
              <ActionButton
                variant="secondary"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Withdraw')}
              >
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
          <DevMockButton position="inline" style={{ marginTop: 24 }} />

          <ComplianceFooter />
        </ScrollView>
      </Container>
    </ScreenWrapper>
  );
};
