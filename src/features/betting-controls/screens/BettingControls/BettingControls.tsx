import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { Icon } from '~/components/Icon/Icon';
import type { RootStackParamList } from '~/navigation/types';
import { Container, MenuCard, MenuIcon, MenuText, ScrollContent } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const BettingControls = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Betting Controls',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollContent>
          <MenuCard onPress={() => navigation.navigate('SetLimits')} activeOpacity={0.7}>
            <MenuIcon>
              <Icon name="💰" size={24} />
            </MenuIcon>
            <MenuText>Set Limits</MenuText>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate('SpendLimit')} activeOpacity={0.7}>
            <MenuIcon>
              <Icon name="ℹ️" size={24} />
            </MenuIcon>
            <MenuText>Spend Limits</MenuText>
          </MenuCard>

          <MenuCard onPress={() => navigation.navigate('SelfExclusion')} activeOpacity={0.7}>
            <MenuIcon>
              <Icon name="🛡️" size={24} />
            </MenuIcon>
            <MenuText>Self exclude</MenuText>
          </MenuCard>
        </ScrollContent>
      </Container>
    </SafeAreaView>
  );
};
