import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Button } from '~/components/Button/Button';
import {
  CodeContainer,
  CodeText,
  Container,
  CopyButton,
  DescriptionText,
  TitleText,
} from './styles';

interface JoinCodeDisplayProps {
  leagueName: string;
  tournamentName: string;
  joinCode: string;
}

export const JoinCodeDisplay = ({ leagueName, tournamentName, joinCode }: JoinCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(joinCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <TitleText>
        Invite players to join {leagueName} {tournamentName}
      </TitleText>

      <DescriptionText>Code to join this league:</DescriptionText>

      <CodeContainer>
        <CodeText>{joinCode}</CodeText>
      </CodeContainer>

      <CopyButton>
        <Button variant="secondary" onPress={handleCopyCode}>
          {copied ? 'COPIED!' : 'COPY AUTO JOIN LINK'}
        </Button>
      </CopyButton>
    </Container>
  );
};
