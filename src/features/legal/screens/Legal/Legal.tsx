import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { BackHandler, Linking, ScrollView } from 'react-native';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { Container, MenuItem, MenuItemArrow, MenuItemText, MenuSection } from './styles';

type MenuItemConfig = {
  label: string;
  onPress: () => void;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Legal = () => {
  const navigation = useNavigation<NavigationProp>();

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

  const menuItems: MenuItemConfig[] = [
    {
      label: 'Terms and Conditions',
      onPress: async () => {
        const url =
          'https://docs.google.com/document/d/1NPCFB2aQ25LmMfDLUteB-tuZC40-T9NY8gNkjtSX1pw/view';
        console.log('Opening Terms URL:', url);
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      },
    },
    {
      label: 'Privacy Policy',
      onPress: async () => {
        const url =
          'https://docs.google.com/document/d/1aZ9DJX19_Co84ywJJryuQa9E9kN9kPdSitFOi900QhM/view';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      },
    },
    {
      label: 'Betting Rules',
      onPress: async () => {
        const url =
          'https://docs.google.com/document/d/1v68MUCje9mobwn4EbHnjQvwAQyVrod05TBfF_qTE_Oo/view';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      },
    },
    {
      label: 'Responsible Gambling',
      onPress: async () => {
        const url =
          'https://docs.google.com/document/d/1Amn6V2Qz4oQ9dhZpgFmubwFo-3QxpertG7uqPT9Gus8/view';
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      },
    },
  ];

  return (
    <ScreenWrapper title="Legal">
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
