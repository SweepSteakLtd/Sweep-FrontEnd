import { useState } from 'react';
import type { Address } from '../AddressLookup';

interface AddressSuggestion {
  id: string;
  address: string;
  url: string;
}

interface UseAddressLookupProps {
  onAddressChange: (address: Address) => void;
  initialPostcode?: string;
}

export const useAddressLookup = ({
  onAddressChange,
  initialPostcode = '',
}: UseAddressLookupProps) => {
  const [postcodeInput, setPostcodeInput] = useState(initialPostcode);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [lookupError, setLookupError] = useState('');

  const searchByPostcode = async () => {
    if (!postcodeInput || postcodeInput.length < 5) {
      setLookupError('Please enter a valid UK postcode');
      return;
    }

    setIsLoading(true);
    setLookupError('');
    setSuggestions([]);

    try {
      const apiKey = process.env.EXPO_PUBLIC_GETADDRESS_API_KEY || '';
      const autocompleteUrl = `https://api.getaddress.io/autocomplete/${encodeURIComponent(postcodeInput)}?api-key=${apiKey}&all=true`;

      const autocompleteResponse = await fetch(autocompleteUrl);

      if (!autocompleteResponse.ok) {
        if (autocompleteResponse.status === 404) {
          setLookupError('No addresses found for this postcode');
        } else if (autocompleteResponse.status === 401 || autocompleteResponse.status === 403) {
          setLookupError('API key error. Please configure getaddress.io API key.');
        } else if (autocompleteResponse.status === 429) {
          setLookupError('Too many requests. Please try again in a moment.');
        } else {
          setLookupError(
            `Error looking up postcode (${autocompleteResponse.status}). Please try again.`,
          );
        }
        return;
      }

      const autocompleteData = await autocompleteResponse.json();

      if (autocompleteData.suggestions && autocompleteData.suggestions.length > 0) {
        setSuggestions(autocompleteData.suggestions);
        setShowAddresses(true);
      } else {
        setLookupError('No addresses found for this postcode');
      }
    } catch (error) {
      setLookupError('Error connecting to address lookup service');
    } finally {
      setIsLoading(false);
    }
  };

  const selectAddress = async (suggestion: AddressSuggestion) => {
    setIsLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_GETADDRESS_API_KEY || '';
      const fullUrl = `https://api.getaddress.io${suggestion.url}?api-key=${apiKey}`;

      const response = await fetch(fullUrl);
      if (response.ok) {
        const addressData = await response.json();

        const parsedAddress: Address = {
          address1: addressData.line_1 || '',
          address2: addressData.line_2 || '',
          address3: addressData.line_3 || '',
          city: addressData.town_or_city || addressData.locality || '',
          county: addressData.county || '',
          postcode: addressData.postcode || postcodeInput,
        };

        onAddressChange(parsedAddress);
        setShowAddresses(false);
        setSuggestions([]);
      } else {
        setLookupError('Error retrieving address details. Please try again.');
      }
    } catch (error) {
      setLookupError('Error retrieving address details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setPostcodeInput('');
    setShowAddresses(false);
    setSuggestions([]);
    setLookupError('');
  };

  return {
    postcodeInput,
    setPostcodeInput,
    suggestions,
    isLoading,
    showAddresses,
    lookupError,
    searchByPostcode,
    selectAddress,
    clearSearch,
  };
};
