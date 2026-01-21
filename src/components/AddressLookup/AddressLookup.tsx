// import { useState } from 'react';
// import { ActivityIndicator } from 'react-native';
// import { useTheme } from 'styled-components/native';
// import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
// import { Typography } from '~/components/Typography/Typography';
// import { useAddressLookup } from './hooks/useAddressLookup';
import {
  // AddressSuggestion,
  // AddressSuggestionsList,
  // AddressSuggestionText,
  Container,
} from './styles';

export interface Address {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
}

interface AddressLookupProps {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  onAddressChange: (address: Address) => void;
  address1Error?: string;
  cityError?: string;
  postcodeError?: string;
  googlePlacesApiKey: string;
}

export const AddressLookup = ({
  address1,
  address2,
  address3,
  city,
  county,
  postcode,
  onAddressChange,
  address1Error,
  cityError,
  postcodeError,
}: AddressLookupProps) => {
  // const theme = useTheme();
  // const [isManualEntry, setIsManualEntry] = useState(false);

  // const {
  //   postcodeInput,
  //   setPostcodeInput,
  //   suggestions,
  //   isLoading,
  //   showAddresses,
  //   lookupError,
  //   searchByPostcode,
  //   selectAddress,
  //   clearSearch,
  // } = useAddressLookup({
  //   onAddressChange,
  //   initialPostcode: postcode,
  // });

  // const handleManualEntry = () => {
  //   setIsManualEntry(true);
  //   clearSearch();
  // };

  // Manual entry only
  return (
    <Container>
      <Input
        variant="light"
        label="Address Line 1"
        value={address1}
        onChangeText={(text) =>
          onAddressChange({ address1: text, address2, address3, city, county, postcode })
        }
        placeholder="123 Main Street"
        error={address1Error}
      />

      <Input
        variant="light"
        label="Address Line 2 (Optional)"
        value={address2}
        onChangeText={(text) =>
          onAddressChange({ address1, address2: text, address3, city, county, postcode })
        }
        placeholder="Apartment, suite, etc."
      />

      <Input
        variant="light"
        label="Address Line 3 (Optional)"
        value={address3}
        onChangeText={(text) =>
          onAddressChange({ address1, address2, address3: text, city, county, postcode })
        }
        placeholder="Building, floor, etc."
      />

      <Input
        variant="light"
        label="City/Town"
        value={city}
        onChangeText={(text) =>
          onAddressChange({ address1, address2, address3, city: text, county, postcode })
        }
        placeholder="London"
        error={cityError}
      />

      <Input
        variant="light"
        label="County (Optional)"
        value={county}
        onChangeText={(text) =>
          onAddressChange({ address1, address2, address3, city, county: text, postcode })
        }
        placeholder="Greater London"
      />

      <Input
        variant="light"
        label="Postcode"
        value={postcode}
        onChangeText={(text) => {
          onAddressChange({ address1, address2, address3, city, county, postcode: text });
        }}
        placeholder="SW1A 1AA"
        autoCapitalize="characters"
        error={postcodeError}
      />
    </Container>
  );

  // COMMENTED OUT: Postcode lookup functionality
  // if (isManualEntry) {
  //   return (
  //     <Container>
  //       <Input
  //         variant="light"
  //         label="Address Line 1"
  //         value={address1}
  //         onChangeText={(text) =>
  //           onAddressChange({ address1: text, address2, address3, city, county, postcode })
  //         }
  //         placeholder="123 Main Street"
  //         error={address1Error}
  //       />

  //       <Input
  //         variant="light"
  //         label="Address Line 2 (Optional)"
  //         value={address2}
  //         onChangeText={(text) =>
  //           onAddressChange({ address1, address2: text, address3, city, county, postcode })
  //         }
  //         placeholder="Apartment, suite, etc."
  //       />

  //       <Input
  //         variant="light"
  //         label="Address Line 3 (Optional)"
  //         value={address3}
  //         onChangeText={(text) =>
  //           onAddressChange({ address1, address2, address3: text, city, county, postcode })
  //         }
  //         placeholder="Building, floor, etc."
  //       />

  //       <Input
  //         variant="light"
  //         label="City/Town"
  //         value={city}
  //         onChangeText={(text) =>
  //           onAddressChange({ address1, address2, address3, city: text, county, postcode })
  //         }
  //         placeholder="London"
  //         error={cityError}
  //       />

  //       <Input
  //         variant="light"
  //         label="County (Optional)"
  //         value={county}
  //         onChangeText={(text) =>
  //           onAddressChange({ address1, address2, address3, city, county: text, postcode })
  //         }
  //         placeholder="Greater London"
  //       />

  //       <Input
  //         variant="light"
  //         label="Postcode"
  //         value={postcode}
  //         onChangeText={(text) => {
  //           onAddressChange({ address1, address2, address3, city, county, postcode: text });
  //           setPostcodeInput(text);
  //         }}
  //         placeholder="SW1A 1AA"
  //         autoCapitalize="characters"
  //         error={postcodeError}
  //       />

  //       <ManualEntryLink onPress={() => setIsManualEntry(false)} style={{ marginBottom: 40 }}>
  //         <ManualEntryText>Use postcode lookup</ManualEntryText>
  //       </ManualEntryLink>
  //     </Container>
  //   );
  // }

  // return (
  //   <Container>
  //     {/* Step 1: Enter postcode and search */}
  //     {!address1 && (
  //       <>
  //         <Input
  //           variant="light"
  //           label="Postcode"
  //           value={postcodeInput}
  //           onChangeText={setPostcodeInput}
  //           placeholder="e.g. SW1A 1AA"
  //           autoCapitalize="characters"
  //           error={lookupError || postcodeError}
  //           onSubmitEditing={searchByPostcode}
  //         />

  //         <Button
  //           variant="secondary"
  //           title={isLoading ? 'Searching...' : 'Find Address'}
  //           onPress={searchByPostcode}
  //           disabled={isLoading || !postcodeInput}
  //           style={{ marginBottom: 16 }}
  //         />

  //         {isLoading && (
  //           <ActivityIndicator
  //             size="small"
  //             color={theme.colors.primary}
  //             style={{ marginBottom: 16 }}
  //           />
  //         )}

  //         {/* Step 2: Show dropdown of full addresses */}
  //         {showAddresses && suggestions.length > 0 && (
  //           <>
  //             <Typography
  //               variant="label"
  //               color={theme.colors.text.tertiary}
  //               style={{ marginBottom: 8, fontSize: 14, fontWeight: '500' }}
  //             >
  //               Select your address
  //             </Typography>
  //             <AddressSuggestionsList>
  //               {suggestions.map((suggestion) => (
  //                 <AddressSuggestion key={suggestion.id} onPress={() => selectAddress(suggestion)}>
  //                   <AddressSuggestionText>{suggestion.address}</AddressSuggestionText>
  //                 </AddressSuggestion>
  //               ))}
  //             </AddressSuggestionsList>
  //           </>
  //         )}

  //         <ManualEntryLink onPress={handleManualEntry} style={{ marginBottom: 40 }}>
  //           <ManualEntryText>Enter address manually</ManualEntryText>
  //         </ManualEntryLink>
  //       </>
  //     )}

  //     {/* Step 3: Show filled address fields after selection (editable for corrections) */}
  //     {address1 && (
  //       <>
  //         <Input
  //           variant="light"
  //           label="Address Line 1"
  //           value={address1}
  //           onChangeText={(text) =>
  //             onAddressChange({ address1: text, address2, address3, city, county, postcode })
  //           }
  //           placeholder="123 Main Street"
  //           error={address1Error}
  //         />

  //         <Input
  //           variant="light"
  //           label="Address Line 2 (Optional)"
  //           value={address2}
  //           onChangeText={(text) =>
  //             onAddressChange({ address1, address2: text, address3, city, county, postcode })
  //           }
  //           placeholder="Apartment, suite, etc."
  //         />

  //         <Input
  //           variant="light"
  //           label="Address Line 3 (Optional)"
  //           value={address3}
  //           onChangeText={(text) =>
  //             onAddressChange({ address1, address2, address3: text, city, county, postcode })
  //           }
  //           placeholder="Building, floor, etc."
  //         />

  //         <Input
  //           variant="light"
  //           label="City/Town"
  //           value={city}
  //           onChangeText={(text) =>
  //             onAddressChange({ address1, address2, address3, city: text, county, postcode })
  //           }
  //           placeholder="London"
  //           error={cityError}
  //         />

  //         <Input
  //           variant="light"
  //           label="County (Optional)"
  //           value={county}
  //           onChangeText={(text) =>
  //           onAddressChange({ address1, address2, address3, city, county: text, postcode })
  //           }
  //           placeholder="Greater London"
  //         />

  //         <Input
  //           variant="light"
  //           label="Postcode"
  //           value={postcode}
  //           onChangeText={(text) => {
  //             onAddressChange({ address1, address2, address3, city, county, postcode: text });
  //             setPostcodeInput(text);
  //           }}
  //           placeholder="SW1A 1AA"
  //           autoCapitalize="characters"
  //           error={postcodeError}
  //         />

  //         <ManualEntryLink
  //           onPress={() => {
  //             // Clear the address to search again
  //             onAddressChange({
  //               address1: '',
  //               address2: '',
  //               address3: '',
  //               city: '',
  //               county: '',
  //               postcode: '',
  //             });
  //             clearSearch();
  //           }}
  //           style={{ marginBottom: 40 }}
  //         >
  //           <ManualEntryText>Search for different address</ManualEntryText>
  //         </ManualEntryLink>
  //       </>
  //     )}
  //   </Container>
  // );
};
