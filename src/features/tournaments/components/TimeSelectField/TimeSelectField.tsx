import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { ErrorText, FieldContainer, FieldLabel, FieldTouchable, FieldValue } from './styles';

interface TimeSelectFieldProps {
  label: string;
  value: Date;
  onValueChange: (date: Date) => void;
  minimumDate?: Date;
  error?: string;
}

export const TimeSelectField = ({
  label,
  value,
  onValueChange,
  minimumDate,
  error,
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
        <FieldTouchable onPress={() => setShowPicker(true)} activeOpacity={0.7}>
          <FieldValue>{formatDate(value)}</FieldValue>
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
