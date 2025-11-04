import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import type { RootStackParamList } from '~/navigation/types';
import {
  ButtonContainer,
  Container,
  Description,
  OptionButton,
  OptionText,
  OptionsContainer,
  ScrollContent,
  SelectText,
  Title,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EXCLUSION_PERIODS = [
  { label: '6 months', value: '6m' },
  { label: '1 year', value: '1y' },
  { label: '3 years', value: '3y' },
  { label: '5 years', value: '5y' },
];

export const SelfExclusion = () => {
  const navigation = useNavigation<NavigationProp>();
  const { showAlert } = useAlert();
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Self Exclusion',
    });
  }, [navigation]);

  const handleContinue = () => {
    if (!selectedPeriod) {
      showAlert({
        title: 'Select Period',
        message: 'Please select an exclusion period to continue.',
      });
      return;
    }

    showAlert({
      title: 'Confirm Self-Exclusion',
      message: `Are you sure you want to self-exclude for ${
        EXCLUSION_PERIODS.find((p) => p.value === selectedPeriod)?.label
      }? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            console.log('Self-exclusion confirmed for:', selectedPeriod);
            // TODO: Implement self-exclusion API call
            showAlert({
              title: 'Self-Exclusion Active',
              message: 'Your account has been self-excluded.',
            });
            navigation.goBack();
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={['bottom']}>
      <Container>
        <ScrollContent style={{ flex: 1 }}>
          <Title>Self Exclusions Policy</Title>
          <Description>
            You are agreeing to self-exclude yourself from our services for a minimum of 6 months.
          </Description>

          <Title style={{ marginTop: 24 }}>Self Exclusion</Title>
          <Description>
            Self-exclusion prevents you from using your account for a minimum of 6 months and up to
            5 years. Once you do, we&apos;ll automatically make changes until the set period
            elapses.
          </Description>

          <SelectText>Select Period</SelectText>
          <OptionsContainer>
            {EXCLUSION_PERIODS.map((period) => (
              <OptionButton
                key={period.value}
                selected={selectedPeriod === period.value}
                onPress={() => setSelectedPeriod(period.value)}
                activeOpacity={0.7}
              >
                <OptionText selected={selectedPeriod === period.value}>{period.label}</OptionText>
              </OptionButton>
            ))}
          </OptionsContainer>
        </ScrollContent>
        <ButtonContainer>
          <Button variant="primary" onPress={handleContinue}>
            Continue
          </Button>
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};
