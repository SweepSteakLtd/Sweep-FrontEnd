import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { BackHandler, FlatList, Image, RefreshControl, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ComplianceFooter } from '~/components/ComplianceFooter/ComplianceFooter';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import { TournamentCard } from '~/features/dashboard/components/TournamentCard/TournamentCard';
import { TournamentCardSkeleton } from '~/features/dashboard/components/TournamentCard/TournamentCardSkeleton';
import type { RootStackParamList } from '~/navigation/types';
import type { Tournament } from '~/services/apis/schemas';
import { useGetTournaments } from '~/services/apis/Tournament/useGetTournaments';
import { EmptyState, EmptyStateText, TournamentGrid } from './styles';

const chipinLogoWhite = require('../../../../../assets/ChipinLogoWhite.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const {
    data: tournaments = [],
    isLoading: loading,
    isFetching,
    error,
    refetch,
  } = useGetTournaments();

  // Disable back button on Android
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Return true to prevent default back behavior
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const handleRefresh = async () => {
    await refetch();
  };

  const handleTournamentPress = (tournament: Tournament) => {
    // Navigate to the tournament navigator with colors for theming
    if (tournament.id) {
      navigation.navigate('Tournament', {
        tournamentId: tournament.id,
        tournamentColors: tournament.colours,
      });
    }
  };

  const headerLeftComponent = (
    <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 20 }}>
      <Image
        source={chipinLogoWhite}
        resizeMode="contain"
        style={{
          width: 120,
          height: 40,
          zIndex: 20,
        }}
      />
    </View>
  );

  if (loading) {
    return (
      <ScreenWrapper
        title="Tournaments"
        showBackButton={false}
        showProfile
        leftComponent={headerLeftComponent}
        headerContentPaddingLeft={0}
      >
        <TournamentGrid>
          <View style={{ padding: 20 }}>
            {/* Show 3 skeleton cards while loading */}
            {[...Array(3)].map((_, index) => (
              <TournamentCardSkeleton key={index} />
            ))}
          </View>
        </TournamentGrid>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper
        title="Tournaments"
        showBackButton={false}
        showProfile
        leftComponent={headerLeftComponent}
        headerContentPaddingLeft={0}
      >
        <EmptyState>
          <EmptyStateText>Failed to load tournaments</EmptyStateText>
          <EmptyStateText style={{ fontSize: 14, marginTop: 8, opacity: 0.7 }}>
            {error.message || 'Please try again later'}
          </EmptyStateText>
        </EmptyState>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      title="Tournaments"
      showBackButton={false}
      showProfile
      leftComponent={headerLeftComponent}
      headerContentPaddingLeft={0}
    >
      {tournaments.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No tournaments available</EmptyStateText>
        </EmptyState>
      ) : (
        <TournamentGrid>
          <FlatList
            data={tournaments}
            renderItem={({ item }) => (
              <TournamentCard tournament={item} onPress={() => handleTournamentPress(item)} />
            )}
            keyExtractor={(item) => item.id || Math.random().toString()}
            ListFooterComponent={<ComplianceFooter />}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isFetching && !loading}
                onRefresh={handleRefresh}
                tintColor={theme.colors.primary}
              />
            }
          />
        </TournamentGrid>
      )}
    </ScreenWrapper>
  );
};
