import { useState } from 'react';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';
import { useTheme } from 'styled-components/native';
import { Typography } from '../Typography/Typography';
import { Container, ErrorText } from './styles';

interface PhoneNumberInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  onCountryChange?: (countryCode: string, callingCode: string) => void;
  editable?: boolean;
}

// Helper to safely get calling code from ICountry
const getCallingCode = (country: ICountry): string => {
  // ICountry from react-native-country-select has a dial_code property
  return ((country as unknown as Record<string, unknown>).dial_code as string) || '';
};

export const PhoneNumberInput = ({
  label,
  value,
  onChangeText,
  error,
  placeholder = '7123 456789',
  onCountryChange,
  editable = true,
}: PhoneNumberInputProps) => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(undefined);

  const handlePhoneChange = (phoneNumber: string) => {
    onChangeText(phoneNumber);
  };

  const handleCountryChange = (country: ICountry) => {
    setSelectedCountry(country);
    const callingCode = getCallingCode(country);
    onCountryChange?.(country.cca2, callingCode);
  };

  return (
    <Container>
      {label && (
        <Typography
          variant="body"
          color={theme.colors.text.primary}
          style={{ marginBottom: 8, fontWeight: '500' }}
        >
          {label}
        </Typography>
      )}
      <PhoneInput
        value={value}
        onChangePhoneNumber={handlePhoneChange}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleCountryChange}
        placeholder={placeholder}
        defaultCountry="GB"
        disabled={!editable}
        phoneInputStyles={{
          container: {
            backgroundColor: theme.colors.input.background,
            borderWidth: 1,
            borderColor: error ? theme.colors.error : theme.colors.input.border,
            borderRadius: 8,
            height: 56,
            opacity: editable ? 1 : 0.6,
          },
          flagContainer: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            paddingLeft: 12,
          },
          flag: {},
          caret: {
            color: theme.colors.text.primary,
            fontSize: 16,
          },
          divider: {
            backgroundColor: theme.colors.border,
          },
          callingCode: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
          },
          input: {
            fontSize: 16,
            color: theme.colors.text.primary,
            flex: 1,
          },
        }}
        modalStyles={{
          backdrop: {},
          searchInput: {
            backgroundColor: theme.colors.input.background,
            borderColor: theme.colors.border,
            color: theme.colors.text.primary,
          },
          flag: {
            fontSize: 24,
          },
          callingCode: {
            color: theme.colors.text.secondary,
          },
          countryName: {
            color: theme.colors.text.primary,
          },
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};
