import React from 'react';
import { Image, View } from 'react-native';
import { Icon } from '~/components/Icon/Icon';
import { CURRENCY_FORMAT, ICON_SIZES } from '~/constants/ui';
import { formatCurrency } from '~/utils/currency';
import {
  Container,
  LeagueName,
  NumberOfTeams,
  PrizePool,
  PrizePoolAmount,
  StatItem,
  StatsRow,
  styles,
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
  const content = (
    <>
      <TournamentInfo>
        <LeagueName>{leagueName}</LeagueName>
        <TournamentName>{tournamentName}</TournamentName>
      </TournamentInfo>

      <StatsRow>
        <StatItem>
          <NumberOfTeams>
            <Icon name="👥" size={ICON_SIZES.HEADER} accessibilityLabel="Teams:" />{' '}
            {totalTeams ?? 0} {totalTeams === 1 ? 'Team' : 'Teams'}
          </NumberOfTeams>
          <PrizePool>
            <Icon name="💵" size={ICON_SIZES.HEADER} accessibilityLabel="Prize pool:" />{' '}
            <PrizePoolAmount>
              {formatCurrency(totalPot, CURRENCY_FORMAT.HIDE_PENCE)}
            </PrizePoolAmount>{' '}
            Prize Pool
          </PrizePool>
        </StatItem>
      </StatsRow>
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
