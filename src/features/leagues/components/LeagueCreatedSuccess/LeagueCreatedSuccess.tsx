import ConfettiCannon from 'react-native-confetti-cannon';
import { Button } from '~/components/Button/Button';
import { JoinCodeCard } from '../JoinCodeCard/JoinCodeCard';
import {
  ButtonsContainer,
  CodeCardWrapper,
  Container,
  DescriptionText,
  SuccessIcon,
  TitleText,
} from './styles';

type LeagueCreatedSuccessProps = {
  leagueName: string;
  tournamentName: string;
  joinCode?: string;
  isPrivate: boolean;
  onViewLeague: () => void;
};

export const LeagueCreatedSuccess = ({
  leagueName,
  tournamentName,
  joinCode,
  isPrivate,
  onViewLeague,
}: LeagueCreatedSuccessProps) => {
  return (
    <Container>
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        fadeOut
        autoStart
        explosionSpeed={350}
      />

      <SuccessIcon>🎉</SuccessIcon>

      <TitleText>League Created!</TitleText>

      <DescriptionText>
        {leagueName} has been created for {tournamentName}
      </DescriptionText>

      {isPrivate && joinCode ? (
        <CodeCardWrapper>
          <JoinCodeCard
            joinCode={joinCode}
            leagueName={leagueName}
            label="Share this code to invite players:"
          />
        </CodeCardWrapper>
      ) : null}

      <ButtonsContainer>
        <Button variant="primary" onPress={onViewLeague} title="View League" fullWidth />
      </ButtonsContainer>
    </Container>
  );
};
