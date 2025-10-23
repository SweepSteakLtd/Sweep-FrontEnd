import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Dropdown } from '~/components/Dropdown/Dropdown';
import { Input } from '~/components/Input/Input';
import { Switch } from '~/components/Switch/Switch';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import { useCreateGame } from '~/services/apis/Game/useCreateGame';
import type { Tournament } from '~/services/apis/Tournament/types';
import { ButtonContainer, ErrorText, GameTypeRow, InputLabel, SwitchLabel } from './styles';
import { createGameSchema } from './validation';

interface CreateGameFormProps {
  activeTournamentId: string;
  tournaments: Tournament[];
  defaultGameType?: 'public' | 'private';
  onSuccess?: () => void;
  onPrivateGameCreated?: (joinCode: string, gameName: string) => void;
}

interface FieldErrors extends Record<string, string | undefined> {
  gameName?: string;
  tournamentId?: string;
  entryFee?: string;
  maxEntries?: string;
}

export const CreateGameForm = ({
  activeTournamentId,
  tournaments,
  defaultGameType = 'public',
  onSuccess,
  onPrivateGameCreated,
}: CreateGameFormProps) => {
  const theme = useTheme();
  const createGameMutation = useCreateGame();

  const [gameName, setGameName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState(activeTournamentId);
  const [gameType, setGameType] = useState<'public' | 'private'>(defaultGameType);
  const [entryFee, setEntryFee] = useState('');
  const [maxEntries, setMaxEntries] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createError, setCreateError] = useState('');

  const tournamentOptions = tournaments.map((t) => ({
    label: t.name,
    value: t.id,
  }));

  const handleCreateGame = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(createGameSchema, {
      gameName,
      tournamentId: selectedTournamentId,
      entryFee,
      maxEntries,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setCreateError('');

    // TODO: Add proper owner_id from auth context and other required fields
    try {
      const response = await createGameMutation.mutateAsync({
        name: gameName,
        description: '',
        entry_fee: parseFloat(entryFee),
        max_participants: parseInt(maxEntries),
        rewards: [],
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        owner_id: 'current-user-id', // TODO: Get from auth context
        tournament_id: selectedTournamentId,
        type: gameType,
      });

      // Reset form on success
      setGameName('');
      setSelectedTournamentId(activeTournamentId);
      setEntryFee('');
      setMaxEntries('');

      // If private game, call the callback to show join code
      if (gameType === 'private' && response.join_code) {
        onPrivateGameCreated?.(response.join_code, gameName);
      } else {
        // For public games, call onSuccess immediately
        onSuccess?.();
      }

      console.log('Game created successfully');
    } catch (error) {
      setCreateError('Failed to create game. Please try again.');
      console.error('Error creating game:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Input
        label="Game Name"
        value={gameName}
        onChangeText={(text) => {
          setGameName(text);
          if (fieldErrors.gameName) {
            setFieldErrors((prev) => ({ ...prev, gameName: undefined }));
          }
        }}
        placeholder="Game Name"
        placeholderTextColor={theme.colors.text.secondary}
        error={fieldErrors.gameName}
      />

      <Dropdown
        label="Tournament"
        value={selectedTournamentId}
        options={tournamentOptions}
        onValueChange={(value) => {
          setSelectedTournamentId(value);
          if (fieldErrors.tournamentId) {
            setFieldErrors((prev) => ({ ...prev, tournamentId: undefined }));
          }
        }}
        placeholder="Select a tournament"
        error={fieldErrors.tournamentId}
      />

      <GameTypeRow>
        <InputLabel>Game Type</InputLabel>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <SwitchLabel isActive={gameType === 'public'}>Public</SwitchLabel>
          <Switch
            value={gameType === 'private'}
            onValueChange={(value) => setGameType(value ? 'private' : 'public')}
          />
          <SwitchLabel isActive={gameType === 'private'}>Private</SwitchLabel>
        </View>
      </GameTypeRow>

      <Input
        label="Entry Fee (min £20 max £1500)"
        variant="currency"
        value={entryFee}
        onChangeText={(text) => {
          setEntryFee(text);
          if (fieldErrors.entryFee) {
            setFieldErrors((prev) => ({ ...prev, entryFee: undefined }));
          }
        }}
        placeholder="40"
        placeholderTextColor={theme.colors.text.secondary}
        error={fieldErrors.entryFee}
      />

      <Input
        label="Max ENTRIES per user"
        value={maxEntries}
        onChangeText={(text) => {
          setMaxEntries(text);
          if (fieldErrors.maxEntries) {
            setFieldErrors((prev) => ({ ...prev, maxEntries: undefined }));
          }
        }}
        placeholder="=3"
        keyboardType="numeric"
        placeholderTextColor={theme.colors.text.secondary}
        error={fieldErrors.maxEntries}
      />

      {createError ? <ErrorText>{createError}</ErrorText> : null}

      <ButtonContainer>
        <Button
          variant="primary"
          onPress={handleCreateGame}
          disabled={createGameMutation.isPending}
          loading={createGameMutation.isPending}
        >
          CREATE GAME
        </Button>
      </ButtonContainer>
    </View>
  );
};
