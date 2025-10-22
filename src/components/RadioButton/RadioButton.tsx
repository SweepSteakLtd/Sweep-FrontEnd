import { Container, Label, RadioCircle, RadioDot } from './styles';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export const RadioButton = ({ label, selected, onPress }: RadioButtonProps) => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <RadioCircle selected={selected}>{selected && <RadioDot />}</RadioCircle>
      <Label>{label}</Label>
    </Container>
  );
};
