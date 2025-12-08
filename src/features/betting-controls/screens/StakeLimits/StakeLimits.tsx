import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import { LimitInput } from '~/components/LimitInput/LimitInput';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import { penceToPounds, poundsToPence } from '~/utils/currency';
import { ButtonContainer, Container, Section } from './styles';

export const StakeLimits = () => {
  const { data: user } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { showAlert } = useAlert();

  const [stakeLimit, setStakeLimit] = useState('');
  const [stakeNoLimit, setStakeNoLimit] = useState(false);

  const handleUpdate = () => {
    // Check if user made any changes
    if (!stakeNoLimit && !stakeLimit) {
      showAlert({
        title: 'No Changes',
        message: 'Please enter a new stake limit or select "No Limit".',
      });
      return;
    }

    const bettingLimit = stakeNoLimit ? undefined : poundsToPence(stakeLimit);

    updateUser(
      { betting_limit: bettingLimit },
      {
        onSuccess: () => {
          showAlert({
            title: 'Success',
            message: 'Stake limit updated successfully',
          });
          // Clear the input fields
          setStakeLimit('');
          setStakeNoLimit(false);
        },
        onError: (error) => {
          showAlert({
            title: 'Error',
            message: 'Failed to update stake limit. Please try again.',
          });
          console.error('Update stake limit error:', error);
        },
      },
    );
  };

  return (
    <ScreenWrapper title="Stake Limits">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={140}
        >
          <Section>
            <LimitInput
              title="Stake Limit"
              currentLimit={
                user?.betting_limit ? penceToPounds(user.betting_limit).toFixed(2) : undefined
              }
              value={stakeLimit}
              onChangeText={setStakeLimit}
              noLimit={stakeNoLimit}
              onNoLimitToggle={() => {
                setStakeNoLimit(!stakeNoLimit);
                if (!stakeNoLimit) setStakeLimit('');
              }}
            />
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
