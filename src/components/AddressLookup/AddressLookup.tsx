import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Input } from '~/components/Input/Input';
import {
  AddressSuggestion,
  AddressSuggestionsList,
  AddressSuggestionText,
  Container,
  ManualEntryLink,
  ManualEntryText,
} from './styles';

export interface Address {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
}

interface AddressLookupProps {
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  onAddressChange: (address: Address) => void;
  address1Error?: string;
  cityError?: string;
  postcodeError?: string;
  googlePlacesApiKey: string;
}

interface PlaceSuggestion {
  place_id: string;
  description: string;
}

export const AddressLookup = ({
  address1,
  address2,
  city,
  postcode,
  onAddressChange,
  address1Error,
  cityError,
  postcodeError,
  googlePlacesApiKey,
}: AddressLookupProps) => {
  const theme = useTheme();
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [searchQuery, setSearchQuery] = useState(postcode);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced search for postcode
  useEffect(() => {
    if (isManualEntry || searchQuery.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      await searchAddress(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isManualEntry]);

  const searchAddress = async (query: string) => {
    setIsLoading(true);
    try {
      const autocompleteUrl = process.env.EXPO_PUBLIC_GOOGLE_PLACES_AUTOCOMPLETE_URL;
      const response = await fetch(
        `${autocompleteUrl}?input=${encodeURIComponent(
          query,
        )}&components=country:gb&key=${googlePlacesApiKey}`,
      );
      const data = await response.json();

      if (data.status === 'REQUEST_DENIED' || data.status === 'INVALID_REQUEST') {
        console.error('Google Places API Error:', data.error_message);
      }

      if (data.predictions) {
        setSuggestions(data.predictions);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching address:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAddress = async (placeId: string) => {
    setIsLoading(true);
    try {
      const detailsUrl = process.env.EXPO_PUBLIC_GOOGLE_PLACES_DETAILS_URL;
      const response = await fetch(
        `${detailsUrl}?place_id=${placeId}&fields=address_components&key=${googlePlacesApiKey}`,
      );
      const data = await response.json();

      if (data.result && data.result.address_components) {
        const components = data.result.address_components;
        const parsedAddress = parseAddressComponents(components);

        onAddressChange(parsedAddress);
        setSearchQuery('');
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching address details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseAddressComponents = (
    components: { types: string[]; long_name: string }[],
  ): Address => {
    let streetNumber = '';
    let route = '';
    let locality = '';
    let postalTown = '';
    let postalCode = '';
    let sublocality = '';

    components.forEach((component) => {
      const types = component.types;
      if (types.includes('street_number')) {
        streetNumber = component.long_name;
      } else if (types.includes('route')) {
        route = component.long_name;
      } else if (types.includes('postal_town')) {
        postalTown = component.long_name;
      } else if (types.includes('locality')) {
        locality = component.long_name;
      } else if (types.includes('sublocality')) {
        sublocality = component.long_name;
      } else if (types.includes('postal_code')) {
        postalCode = component.long_name;
      }
    });

    const address1Line = [streetNumber, route].filter(Boolean).join(' ');
    const cityName = postalTown || locality || sublocality;

    return {
      address1: address1Line,
      address2: '',
      city: cityName,
      postcode: postalCode,
    };
  };

  const handleManualEntry = () => {
    setIsManualEntry(true);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  if (isManualEntry) {
    return (
      <Container>
        <Input
          variant="light"
          label="Address Line 1"
          value={address1}
          onChangeText={(text) => onAddressChange({ address1: text, address2, city, postcode })}
          placeholder="123 Main Street"
          error={address1Error}
        />

        <Input
          variant="light"
          label="Address Line 2 (Optional)"
          value={address2}
          onChangeText={(text) => onAddressChange({ address1, address2: text, city, postcode })}
          placeholder="Apartment, suite, etc."
        />

        <Input
          variant="light"
          label="City"
          value={city}
          onChangeText={(text) => onAddressChange({ address1, address2, city: text, postcode })}
          placeholder="London"
          error={cityError}
        />

        <Input
          variant="light"
          label="Postcode"
          value={postcode}
          onChangeText={(text) => {
            onAddressChange({ address1, address2, city, postcode: text });
            setSearchQuery(text);
          }}
          placeholder="SW1A 1AA"
          autoCapitalize="characters"
          error={postcodeError}
        />

        <ManualEntryLink onPress={() => setIsManualEntry(false)}>
          <ManualEntryText>Use address lookup</ManualEntryText>
        </ManualEntryLink>
      </Container>
    );
  }

  return (
    <Container>
      {/* Show search bar only if no address has been selected */}
      {!address1 && (
        <>
          <Input
            variant="light"
            label="Address Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="e.g. 10 Downing Street, London"
          />

          {isLoading && (
            <ActivityIndicator size="small" color={theme.colors.primary} style={{ marginTop: 8 }} />
          )}

          {showSuggestions && suggestions.length > 0 && (
            <AddressSuggestionsList>
              {suggestions.map((suggestion) => (
                <AddressSuggestion
                  key={suggestion.place_id}
                  onPress={() => selectAddress(suggestion.place_id)}
                >
                  <AddressSuggestionText>{suggestion.description}</AddressSuggestionText>
                </AddressSuggestion>
              ))}
            </AddressSuggestionsList>
          )}

          <ManualEntryLink onPress={handleManualEntry}>
            <ManualEntryText>Enter address manually</ManualEntryText>
          </ManualEntryLink>
        </>
      )}

      {/* Show filled address fields after selection */}
      {address1 && (
        <>
          <Input
            variant="light"
            label="Address Line 1"
            value={address1}
            onChangeText={(text) => onAddressChange({ address1: text, address2, city, postcode })}
            placeholder="123 Main Street"
            error={address1Error}
          />

          <Input
            variant="light"
            label="Address Line 2 (Optional)"
            value={address2}
            onChangeText={(text) => onAddressChange({ address1, address2: text, city, postcode })}
            placeholder="Apartment, suite, etc."
          />

          <Input
            variant="light"
            label="City"
            value={city}
            onChangeText={(text) => onAddressChange({ address1, address2, city: text, postcode })}
            placeholder="London"
            error={cityError}
          />

          <Input
            variant="light"
            label="Postcode"
            value={postcode}
            onChangeText={(text) => onAddressChange({ address1, address2, city, postcode: text })}
            placeholder="SW1A 1AA"
            autoCapitalize="characters"
            error={postcodeError}
          />

          <ManualEntryLink
            onPress={() => {
              // Clear the address to show the search bar again
              onAddressChange({ address1: '', address2: '', city: '', postcode: '' });
              setSearchQuery('');
            }}
          >
            <ManualEntryText>Use address lookup</ManualEntryText>
          </ManualEntryLink>
        </>
      )}
    </Container>
  );
};
