import { useTheme } from 'styled-components/native';
import { Checkbox } from '~/components/Checkbox/Checkbox';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import {
  CheckboxContainer,
  CurrentLimitText,
  InputRow,
  LimitCard,
  LimitLabel,
  LimitTitle,
  TitleRow,
} from './styles';

interface LimitInputProps {
  title: string;
  currentLimit?: string;
  value: string;
  onChangeText: (text: string) => void;
  noLimit: boolean;
  onNoLimitToggle: () => void;
  placeholder?: string;
  label?: string;
  showCurrentLimit?: boolean;
}

export const LimitInput = ({
  title,
  currentLimit,
  value,
  onChangeText,
  noLimit,
  onNoLimitToggle,
  placeholder = 'Amount',
  label = 'New Limit',
  showCurrentLimit = true,
}: LimitInputProps) => {
  const theme = useTheme();

  return (
    <LimitCard>
      <TitleRow>
        <LimitTitle>{title}</LimitTitle>
        {showCurrentLimit && (
          <CurrentLimitText>Current: £{currentLimit || 'No Limit'}</CurrentLimitText>
        )}
      </TitleRow>

      <InputRow>
        <LimitLabel>{label}</LimitLabel>
        <Input
          variant="currency"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!noLimit}
        />
      </InputRow>

      <CheckboxContainer>
        <Checkbox checked={noLimit} onPress={onNoLimitToggle}>
          <Typography variant="body" color={theme.colors.text.primary}>
            No Limit
          </Typography>
        </Checkbox>
      </CheckboxContainer>
    </LimitCard>
  );
};
