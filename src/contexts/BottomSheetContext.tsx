import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import type { DropdownOption } from '~/components/Dropdown/Dropdown';
import { Typography } from '~/components/Typography/Typography';
import { CheckIcon, OptionItem, SheetContainer, SheetHeader } from './BottomSheetContext.styles';

interface BottomSheetOptions {
  title: string;
  options: DropdownOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
}

interface BottomSheetContextType {
  showBottomSheet: (options: BottomSheetOptions) => void;
  hideBottomSheet: () => void;
  isOpen: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [options, setOptions] = useState<BottomSheetOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ['50%', '70%'], []);

  const showBottomSheet = useCallback((sheetOptions: BottomSheetOptions) => {
    setOptions(sheetOptions);
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  }, []);

  const hideBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChange = useCallback((index: number) => {
    setIsOpen(index !== -1);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      options?.onSelect(value);
      hideBottomSheet();
    },
    [options, hideBottomSheet],
  );

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: DropdownOption }) => {
      const isSelected = item.value === options?.selectedValue;
      return (
        <OptionItem
          onPress={() => handleSelect(item.value)}
          activeOpacity={0.7}
          isSelected={isSelected}
        >
          <Typography
            variant="body"
            color={isSelected ? theme.colors.primary : theme.colors.text.primary}
            weight={isSelected ? 'bold' : 'normal'}
          >
            {item.label}
          </Typography>
          {isSelected && <CheckIcon>✓</CheckIcon>}
        </OptionItem>
      );
    },
    [options?.selectedValue, theme, handleSelect],
  );

  return (
    <BottomSheetContext.Provider value={{ showBottomSheet, hideBottomSheet, isOpen }}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: theme.colors.background }}
        handleIndicatorStyle={{ backgroundColor: theme.colors.border }}
        onChange={handleSheetChange}
      >
        <SheetContainer>
          <SheetHeader>
            <Typography variant="subheading" weight="bold">
              {options?.title || 'Select'}
            </Typography>
          </SheetHeader>
          <BottomSheetFlatList
            data={options?.options || []}
            keyExtractor={(item) => item.value}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </SheetContainer>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within BottomSheetProvider');
  }
  return context;
};
