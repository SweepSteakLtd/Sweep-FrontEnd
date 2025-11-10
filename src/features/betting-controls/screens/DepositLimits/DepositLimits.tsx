import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { LimitInput } from '~/components/LimitInput/LimitInput';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { penceToPounds } from '~/utils/currency';
import { useDepositLimits } from '../../hooks/useDepositLimits';
import { ButtonContainer, Container, Section } from './styles';

export const DepositLimits = () => {
  const { depositLimits, updateLimit, toggleNoLimit, handleUpdate, isPending } = useDepositLimits();

  return (
    <ScreenWrapper title="Deposit Limits">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={10}
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
