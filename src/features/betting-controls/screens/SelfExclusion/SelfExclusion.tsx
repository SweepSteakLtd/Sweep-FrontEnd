import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import { Dropdown } from '~/components/Dropdown/Dropdown';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import {
  ButtonContainer,
  Container,
  CurrentExclusionBox,
  CurrentExclusionDate,
  CurrentExclusionTitle,
  Description,
  Title,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const EXCLUSION_PERIODS = [
  { label: '6 months', value: '6m', months: 6 },
  { label: '1 year', value: '1y', months: 12 },
  { label: '3 years', value: '3y', months: 36 },
  { label: '5 years', value: '5y', months: 60 },
];

export const SelfExclusion = () => {
  const navigation = useNavigation<NavigationProp>();
  const { showAlert } = useAlert();
  const { data: user } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

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

  // Format the exclusion end date if it exists
  const exclusionEndDate = user?.exclusion_ending
    ? new Date(user.exclusion_ending).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const isCurrentlyExcluded = user?.is_self_excluded && exclusionEndDate;

  const handleContinue = () => {
    if (!selectedPeriod) {
      showAlert({
        title: 'Select Period',
        message: 'Please select an exclusion period to continue.',
      });
      return;
    }

    const period = EXCLUSION_PERIODS.find((p) => p.value === selectedPeriod);
    if (!period) return;

    showAlert({
      title: 'Confirm Self-Exclusion',
      message: `Are you sure you want to self-exclude for ${period.label}? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: () => {
            // Calculate exclusion ending date
            const exclusionEndingDate = new Date();
            exclusionEndingDate.setMonth(exclusionEndingDate.getMonth() + period.months);

            updateUser(
              {
                is_self_excluded: true,
                exclusion_ending: exclusionEndingDate.toISOString(),
              },
              {
                onSuccess: () => {
                  showAlert({
                    title: 'Self-Exclusion Active',
                    message: `Your account has been self-excluded until ${exclusionEndingDate.toLocaleDateString()}.`,
                  });
                  navigation.goBack();
                },
                onError: () => {
                  showAlert({
                    title: 'Error',
                    message: 'Failed to activate self-exclusion. Please try again.',
                  });
                },
              },
            );
          },
        },
      ],
    });
  };

  return (
    <ScreenWrapper title="Self Exclusion">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={140}
        >
          <Title>Self Exclusions Policy</Title>
          <Description>
            You are agreeing to self-exclude yourself from our services for a minimum of 6 months.
          </Description>

          {isCurrentlyExcluded && (
            <CurrentExclusionBox>
              <CurrentExclusionTitle>Current Self-Exclusion Active</CurrentExclusionTitle>
              <CurrentExclusionDate>
                Your account is self-excluded until {exclusionEndDate}
              </CurrentExclusionDate>
            </CurrentExclusionBox>
          )}

          <Title style={{ marginTop: 16 }}>Self Exclusion</Title>
          <Description>
            Self-exclusion prevents you from using your account for a minimum of 6 months and up to
            5 years. Once you do, we&apos;ll automatically make changes until the set period
            elapses.
          </Description>

          <Dropdown
            label="Select Period"
            placeholder="Choose exclusion period"
            value={selectedPeriod || ''}
            options={EXCLUSION_PERIODS}
            onValueChange={setSelectedPeriod}
            style={{ marginTop: 24 }}
          />
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button
              variant="primary"
              onPress={handleContinue}
              disabled={isPending}
              title={isPending ? 'Processing...' : 'Continue'}
            />
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
