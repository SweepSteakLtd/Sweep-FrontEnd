import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { ErrorText, FieldContainer, FieldLabel, FieldTouchable, FieldValue } from './styles';

interface TimeSelectFieldProps {
  label: string;
  value: Date;
  onValueChange: (date: Date) => void;
  minimumDate?: Date;
  error?: string;
  disabled?: boolean;
}

export const TimeSelectField = ({
  label,
  value,
  onValueChange,
  minimumDate,
  error,
  disabled,
}: TimeSelectFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <FieldTouchable
          onPress={() => !disabled && setShowPicker(true)}
          activeOpacity={disabled ? 1 : 0.7}
          disabled={disabled}
        >
          <FieldValue disabled={disabled}>{formatDate(value)}</FieldValue>
        </FieldTouchable>
      </FieldContainer>
      {error && <ErrorText>{error}</ErrorText>}

      <DatePicker
        modal
        open={showPicker}
        date={value}
        onConfirm={(date) => {
          setShowPicker(false);
          onValueChange(date);
        }}
        onCancel={() => setShowPicker(false)}
        minimumDate={minimumDate}
      />
    </>
  );
};
