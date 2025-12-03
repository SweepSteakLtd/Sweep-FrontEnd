import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Share } from 'react-native';
import {
  CodeContainer,
  CodeText,
  Container,
  HintText,
  ShareButton,
  ShareButtonText,
  ShareHintText,
  Title,
} from './styles';

type JoinCodeCardProps = {
  joinCode: string;
  leagueName: string;
};

export const JoinCodeCard = ({ joinCode, leagueName }: JoinCodeCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleLongPress = async () => {
    await Clipboard.setStringAsync(joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <CodeContainer onLongPress={handleLongPress} delayLongPress={300} activeOpacity={0.7}>
        <Title>Join code</Title>
        <CodeText>{joinCode}</CodeText>
        <HintText>{copied ? 'Copied!' : 'Hold to copy'}</HintText>
      </CodeContainer>
      <ShareButton onPress={handleShare}>
        <ShareButtonText>Share</ShareButtonText>
        <ShareHintText>Share this code</ShareHintText>
      </ShareButton>
    </Container>
  );
};
