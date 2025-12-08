import { useState } from 'react';
import { Input } from '../Input/Input';

interface PhoneNumberInputProps {
  label?: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
  editable?: boolean;
}

const formatPhoneNumber = (text: string): string => {
  // Remove all non-digit characters
  const digits = text.replace(/\D/g, '');
  // Limit to 10 digits
  const limitedDigits = digits.slice(0, 10);
  // Format with space: 7123 456789
  if (limitedDigits.length <= 4) {
    return limitedDigits;
  }
  return `${limitedDigits.slice(0, 4)} ${limitedDigits.slice(4)}`;
};

export const PhoneNumberInput = ({
  label,
  onChangeText,
  error,
  placeholder = '7123 456789',
  editable = true,
}: PhoneNumberInputProps) => {
  const [displayValue, setDisplayValue] = useState('');

  const handleChangeText = (text: string) => {
    // Format for display
    const formatted = formatPhoneNumber(text);
    setDisplayValue(formatted);

    // Send E.164 format to parent (+44 + digits only)
    const digitsOnly = text.replace(/\D/g, '').slice(0, 10);
    onChangeText(`+44${digitsOnly}`);
  };

  return (
    <Input
      label={label}
      value={displayValue}
      onChangeText={handleChangeText}
      error={error}
      placeholder={placeholder}
      keyboardType="phone-pad"
      editable={editable}
      maxLength={11}
      variant="phone"
    />
  );
};
