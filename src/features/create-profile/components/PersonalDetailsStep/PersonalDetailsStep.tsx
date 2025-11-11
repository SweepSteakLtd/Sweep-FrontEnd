import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { useTheme } from 'styled-components/native';
import { AddressLookup, type Address } from '~/components/AddressLookup/AddressLookup';
import { Typography } from '~/components/Typography/Typography';
import { DateButton, DateButtonText, StepContainer, StepDescription, StepTitle } from './styles';

interface PersonalDetailsStepProps {
  dateOfBirth: Date | undefined;
  onDateOfBirthChange: (date: Date) => void;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  onAddress1Change: (text: string) => void;
  onAddress2Change: (text: string) => void;
  onCityChange: (text: string) => void;
  onPostcodeChange: (text: string) => void;
  address1Error?: string;
  cityError?: string;
  postcodeError?: string;
}

export const PersonalDetailsStep = ({
  dateOfBirth,
  onDateOfBirthChange,
  address1,
  address2,
  city,
  postcode,
  onAddress1Change,
  onAddress2Change,
  onCityChange,
  onPostcodeChange,
  address1Error,
  cityError,
  postcodeError,
}: PersonalDetailsStepProps) => {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <StepContainer>
      <StepTitle>
        <Typography variant="heading" color={theme.colors.text.primary}>
          Personal details
        </Typography>
      </StepTitle>
      <StepDescription>
        <Typography variant="body" color={theme.colors.text.secondary}>
          We need a few more details to set up your account
        </Typography>
      </StepDescription>

      <Typography
        variant="body"
        color={theme.colors.text.primary}
        style={{ marginBottom: 8, fontWeight: '500' }}
      >
        Date of Birth
      </Typography>
      <DateButton onPress={() => setShowDatePicker(true)}>
        <DateButtonText hasValue={!!dateOfBirth}>{formatDate(dateOfBirth)}</DateButtonText>
      </DateButton>

      <DatePicker
        modal
        open={showDatePicker}
        date={dateOfBirth || new Date()}
        mode="date"
        maximumDate={new Date()}
        onConfirm={(date) => {
          setShowDatePicker(false);
          onDateOfBirthChange(date);
        }}
        onCancel={() => setShowDatePicker(false)}
      />

      <Typography
        variant="body"
        color={theme.colors.text.primary}
        style={{ marginTop: 24, marginBottom: 16, fontWeight: '600' }}
      >
        Address
      </Typography>

      <AddressLookup
        address1={address1}
        address2={address2}
        city={city}
        postcode={postcode}
        onAddressChange={(address: Address) => {
          onAddress1Change(address.address1);
          onAddress2Change(address.address2);
          onCityChange(address.city);
          onPostcodeChange(address.postcode);
        }}
        address1Error={address1Error}
        cityError={cityError}
        postcodeError={postcodeError}
        googlePlacesApiKey={process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || ''}
      />
    </StepContainer>
  );
};
