import React from 'react';
import { Image, View } from 'react-native';
import {
  Container,
  HeaderRow,
  LeagueName,
  PrizeAmount,
  PrizeCard,
  PrizeLabel,
  styles,
  TeamsCard,
  TeamsCount,
  TeamsLabel,
  TournamentInfo,
  TournamentName,
} from './styles';

interface LeaderboardHeaderProps {
  tournamentName?: string;
  leagueName?: string;
  totalPot?: number;
  totalTeams?: number;
  coverPhoto?: string;
}

export const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({
  tournamentName,
  leagueName,
  totalPot,
  totalTeams,
  coverPhoto,
}) => {
  const hasCover = !!coverPhoto;

  const content = (
    <>
      <TournamentInfo hasCover={hasCover}>
        <LeagueName>{leagueName}</LeagueName>
        <TournamentName>{tournamentName}</TournamentName>
      </TournamentInfo>

      <HeaderRow>
        <TeamsCard>
          <TeamsCount>{totalTeams ?? 0}</TeamsCount>
          <TeamsLabel>Teams competing</TeamsLabel>
        </TeamsCard>

        <PrizeCard>
          <PrizeAmount>£{(totalPot ?? 0).toLocaleString()}</PrizeAmount>
          <PrizeLabel>Prize pool</PrizeLabel>
        </PrizeCard>
      </HeaderRow>
    </>
  );

  if (coverPhoto) {
    return (
      <View style={styles.coverContainer}>
        <Image source={{ uri: coverPhoto }} resizeMode="cover" style={styles.coverImage} />
        <View style={styles.coverOverlay}>{content}</View>
      </View>
    );
  }

  return <Container>{content}</Container>;
};
