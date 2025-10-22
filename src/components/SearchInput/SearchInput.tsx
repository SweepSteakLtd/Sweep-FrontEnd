import { Container, SearchIcon, StyledTextInput } from './styles';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}: SearchInputProps) => {
  return (
    <Container>
      <SearchIcon>🔍</SearchIcon>
      <StyledTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
      />
    </Container>
  );
};
