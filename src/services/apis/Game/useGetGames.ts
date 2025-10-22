import { useQuery } from '@tanstack/react-query';
import { firebaseAuth } from '~/lib/firebase';
import { Game, GamesResponse } from './types';

// Query Keys
export const gameQueryKeys = {
  games: ['games'] as const,
  game: (id: string) => ['games', id] as const,
};

// API Function - exported for use outside of hook
export const fetchGames = async (): Promise<Game[]> => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  try {
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/games`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'x-auth-id': token },
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch games: ${res.status}`);
    }

    const data = (await res.json()) as GamesResponse;
    return data.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

/**
 * Hook to fetch all games
 */
export const useGetGames = (enabled: boolean = true) => {
  return useQuery({
    queryKey: gameQueryKeys.games,
    queryFn: fetchGames,
    enabled: enabled && !!firebaseAuth.currentUser,
    staleTime: 1000 * 60 * 2, // 2 minutes (games update more frequently)
    retry: 2,
  });
};
