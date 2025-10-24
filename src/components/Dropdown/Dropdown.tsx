import { useTheme } from 'styled-components/native';
import { useBottomSheet } from '~/contexts/BottomSheetContext';
import { Typography } from '../Typography/Typography';
import { Container, DropdownButton, DropdownText, ErrorText, Label } from './styles';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  value?: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  error?: string;
}

export const Dropdown = ({
  label,
  placeholder = 'Select an option',
  value,
  options,
  onValueChange,
  error,
}: DropdownProps) => {
  const theme = useTheme();
  const { showBottomSheet } = useBottomSheet();

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOpen = () => {
    showBottomSheet({
      title: label || 'Select',
      options,
      selectedValue: value,
      onSelect: onValueChange,
    });
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <DropdownButton onPress={handleOpen} activeOpacity={0.7} hasError={!!error}>
        <DropdownText hasValue={!!selectedOption}>
          {selectedOption ? selectedOption.label : placeholder}
        </DropdownText>
        <Typography variant="body" color={theme.colors.text.secondary}>
          ▼
        </Typography>
      </DropdownButton>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
