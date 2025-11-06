import { useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useTheme } from 'styled-components/native';
import { useAlert } from '~/components/Alert/Alert';
import { Button } from '~/components/Button/Button';
import { Checkbox } from '~/components/Checkbox/Checkbox';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Typography } from '~/components/Typography/Typography';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import {
  ButtonContainer,
  CheckboxContainer,
  Container,
  CurrentLimitText,
  InputRow,
  LimitLabel,
  LimitTitle,
  Section,
  TitleRow,
} from './styles';

type LimitConfig = {
  id: string;
  title: string;
  currentLimit: string;
  newLimit: string;
  noLimit: boolean;
  setNewLimit: (value: string) => void;
  setNoLimit: (value: boolean) => void;
};

export const StakeLimits = () => {
  const theme = useTheme();
  const { data: user } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { showAlert } = useAlert();

  const [stakeLimit, setStakeLimit] = useState('');
  const [stakeNoLimit, setStakeNoLimit] = useState(false);

  const stakeLimits: LimitConfig[] = [
    {
      id: 'stake',
      title: 'Stake Limit',
      currentLimit: user?.betting_limit?.toString() || '0',
      newLimit: stakeLimit,
      noLimit: stakeNoLimit,
      setNewLimit: setStakeLimit,
      setNoLimit: setStakeNoLimit,
    },
  ];

  const handleUpdate = () => {
    // Check if user made any changes
    if (!stakeNoLimit && !stakeLimit) {
      showAlert({
        title: 'No Changes',
        message: 'Please enter a new stake limit or select "No Limit".',
      });
      return;
    }

    const bettingLimit = stakeNoLimit ? undefined : parseFloat(stakeLimit);

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

  const handleNoLimitToggle = (limit: LimitConfig) => {
    const newNoLimitValue = !limit.noLimit;
    limit.setNoLimit(newNoLimitValue);
    if (newNoLimitValue) {
      // Clear the input when No Limit is checked
      limit.setNewLimit('');
    }
  };

  const renderLimitCard = (limit: LimitConfig) => (
    <InputRow key={limit.id}>
      <TitleRow>
        <LimitTitle>{limit.title}</LimitTitle>
        <CurrentLimitText>Current: £{limit.currentLimit || 'No Limit'}</CurrentLimitText>
      </TitleRow>

      <LimitLabel>New Limit</LimitLabel>
      <Input
        variant="currency"
        value={limit.newLimit}
        onChangeText={limit.setNewLimit}
        placeholder="Amount"
        editable={!limit.noLimit}
      />

      <CheckboxContainer>
        <Checkbox checked={limit.noLimit} onPress={() => handleNoLimitToggle(limit)}>
          <Typography variant="body" color={theme.colors.text.primary}>
            No Limit
          </Typography>
        </Checkbox>
      </CheckboxContainer>
    </InputRow>
  );

  return (
    <ScreenWrapper title="Stake Limits">
      <Container>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          bottomOffset={10}
        >
          <Section>{stakeLimits.map(renderLimitCard)}</Section>
        </KeyboardAwareScrollView>
        <KeyboardStickyView>
          <ButtonContainer>
            <Button variant="secondary" onPress={handleUpdate} disabled={isPending}>
              {isPending ? 'Updating...' : 'Update'}
            </Button>
          </ButtonContainer>
        </KeyboardStickyView>
      </Container>
    </ScreenWrapper>
  );
};
