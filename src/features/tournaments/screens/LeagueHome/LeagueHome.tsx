import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { CoverCard } from '~/components/CoverCard/CoverCard';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useGetLeague } from '~/services/apis/League/useGetLeague';
import { formatCurrency } from '~/utils/currency';
import { LeagueHomeSkeleton } from './LeagueHomeSkeleton';
import {
  ButtonsContainer,
  Container,
  Header,
  InfoIcon,
  InfoItem,
  InfoLabel,
  InfoRow,
  InfoValue,
  LeagueName,
  ScrollContent,
  TimeLabel,
  TimeRow,
  TimeSection,
  TimeValue,
} from './styles';

type LeagueHomeRouteProp = RouteProp<RootStackParamList, 'LeagueHome'>;

export const LeagueHome = () => {
  const theme = useTheme();
  const route = useRoute<LeagueHomeRouteProp>();
  const { leagueId } = route.params;

  const { data: leagueData, isLoading, error } = useGetLeague(leagueId);

  if (isLoading || !leagueData) {
    return <LeagueHomeSkeleton />;
  }

  if (error) {
    console.error('Error loading league:', error);
  }

  const { league, tournament } = leagueData;

  if (!league) {
    return <LeagueHomeSkeleton />;
  }

  const totalPot = (league.entry_fee ?? 0) * (league.max_participants ?? 0);
  const currentParticipants = league.user_id_list?.length || 0;
  const maxParticipants = league.max_participants || 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScreenWrapper title="League Home">
      <Container>
        <ScrollContent>
          {/* Header with league info */}
          <Header>
            <LeagueName>{league.name}</LeagueName>
            <InfoRow>
              <InfoItem>
                <InfoIcon>
                  <Typography
                    variant="body"
                    color={theme.colors.text.primary}
                    style={{ fontSize: 24 }}
                  >
                    👥
                  </Typography>
                </InfoIcon>
                <InfoLabel>PARTICIPANTS</InfoLabel>
                <InfoValue>
                  {currentParticipants}/{maxParticipants}
                </InfoValue>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <Typography
                    variant="body"
                    color={theme.colors.text.primary}
                    style={{ fontSize: 24 }}
                  >
                    🏆
                  </Typography>
                </InfoIcon>
                <InfoLabel>TOTAL POT</InfoLabel>
                <InfoValue>{formatCurrency(totalPot)}</InfoValue>
              </InfoItem>
            </InfoRow>
          </Header>

          {/* Tournament Banner */}
          {tournament && (
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              <CoverCard
                imageUri={tournament.cover_picture}
                title={tournament.name || 'Tournament'}
                subtitle={tournament.description}
                height={180}
              />
            </View>
          )}

          {/* Action Buttons */}
          <ButtonsContainer>
            <Button
              title="Submit your fantasy list of golfers"
              variant="secondary"
              onPress={() => {
                // TODO: Navigate to submit team
                console.log('Submit team');
              }}
              fullWidth
            />
            <Button
              title="View Leaderboard"
              onPress={() => {
                // TODO: Navigate to leaderboard
                console.log('View leaderboard');
              }}
              backgroundColor={theme.colors.secondary}
              fullWidth
            />
          </ButtonsContainer>

          {/* Time Section */}
          {league.start_time && league.end_time && (
            <TimeSection>
              <TimeRow style={{ marginBottom: 12 }}>
                <Typography
                  variant="body"
                  color={theme.colors.text.primary}
                  style={{ fontSize: 20 }}
                >
                  📅
                </Typography>
                <View style={{ flex: 1 }}>
                  <TimeLabel>Starts</TimeLabel>
                  <TimeValue>{formatDate(league.start_time)}</TimeValue>
                </View>
              </TimeRow>
              <TimeRow>
                <Typography
                  variant="body"
                  color={theme.colors.text.primary}
                  style={{ fontSize: 20 }}
                >
                  📅
                </Typography>
                <View style={{ flex: 1 }}>
                  <TimeLabel>Ends</TimeLabel>
                  <TimeValue>{formatDate(league.end_time)}</TimeValue>
                </View>
              </TimeRow>
            </TimeSection>
          )}

          {/* Description if available */}
          {league.description && (
            <View style={{ padding: 16 }}>
              <Typography
                variant="label"
                color={theme.colors.text.tertiary}
                style={{ marginBottom: 8 }}
              >
                DESCRIPTION
              </Typography>
              <Typography variant="body" color={theme.colors.text.primary}>
                {league.description}
              </Typography>
            </View>
          )}
        </ScrollContent>
      </Container>
    </ScreenWrapper>
  );
};
