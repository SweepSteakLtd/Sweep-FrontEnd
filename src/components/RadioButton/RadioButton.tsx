import { Container, Label, RadioCircle, RadioDot } from './styles';

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  activeColor?: string;
}

export const RadioButton = ({ label, selected, onPress, activeColor }: RadioButtonProps) => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <RadioCircle selected={selected} activeColor={activeColor}>
        {selected && <RadioDot activeColor={activeColor} />}
      </RadioCircle>
      <Label>{label}</Label>
    </Container>
  );
};
