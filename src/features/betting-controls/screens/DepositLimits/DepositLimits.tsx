import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { LimitInput } from '~/components/LimitInput/LimitInput';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import type { RootStackParamList } from '~/navigation/types';
import { penceToPounds } from '~/utils/currency';
import { useDepositLimits } from '../../hooks/useDepositLimits';
import { ButtonContainer, Container, Section } from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DepositLimits = () => {
  const navigation = useNavigation<NavigationProp>();
  const { depositLimits, updateLimit, toggleNoLimit, handleUpdate, isPending } = useDepositLimits();

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

  return (
    <ScreenWrapper title="Deposit Limits">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={140}
        >
          <Section>
            {depositLimits.map((limit) => (
              <LimitInput
                key={limit.id}
                title={limit.title}
                currentLimit={
                  limit.currentLimit ? penceToPounds(limit.currentLimit).toFixed(2) : undefined
                }
                value={limit.value}
                onChangeText={(value) => updateLimit(limit.id, value)}
                noLimit={limit.noLimit}
                onNoLimitToggle={() => toggleNoLimit(limit.id)}
              />
            ))}
          </Section>
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button
              variant="secondary"
              onPress={handleUpdate}
              disabled={isPending}
              title={isPending ? 'Updating...' : 'Update'}
            />
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
