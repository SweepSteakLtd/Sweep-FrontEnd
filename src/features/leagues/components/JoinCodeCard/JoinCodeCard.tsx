import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Share } from 'react-native';
import { ButtonsRow, CodeText, Container, Label, LinkButton, LinkText } from './styles';

type JoinCodeCardProps = {
  joinCode: string;
  leagueName: string;
  label?: string;
};

export const JoinCodeCard = ({ joinCode, leagueName, label }: JoinCodeCardProps) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(joinCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join my private league "${leagueName}" on SweepSteak! Use code: ${joinCode}`,
        title: `Join ${leagueName} on SweepSteak`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Container>
      <CodeText>{joinCode}</CodeText>
      {label ? <Label>{label}</Label> : null}
      <ButtonsRow>
        <LinkButton onPress={handleCopyCode}>
          <LinkText>{copiedCode ? 'Copied!' : 'Copy'}</LinkText>
        </LinkButton>
        <LinkButton onPress={handleShare}>
          <LinkText>Share</LinkText>
        </LinkButton>
      </ButtonsRow>
    </Container>
  );
};
