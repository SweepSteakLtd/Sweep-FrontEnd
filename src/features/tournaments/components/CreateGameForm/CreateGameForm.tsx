import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Switch } from '~/components/Switch/Switch';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import { useCreateGame } from '~/services/apis/Game/useCreateGame';
import { ButtonContainer, ErrorText, GameTypeRow, InputLabel, SwitchLabel } from './styles';
import { createGameSchema } from './validation';

interface CreateGameFormProps {
  activeTournamentId: string;
  onSuccess?: () => void;
}

interface FieldErrors extends Record<string, string | undefined> {
  gameName?: string;
  entryFee?: string;
  maxEntries?: string;
}

export const CreateGameForm = ({ activeTournamentId, onSuccess }: CreateGameFormProps) => {
  const theme = useTheme();
  const createGameMutation = useCreateGame();

  const [gameName, setGameName] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [gameType, setGameType] = useState<'public' | 'private'>('private');
  const [entryFee, setEntryFee] = useState('');
  const [maxEntries, setMaxEntries] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createError, setCreateError] = useState('');

  const handleCreateGame = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(createGameSchema, {
      gameName,
      tournamentName,
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
      await createGameMutation.mutateAsync({
        name: gameName,
        description: '',
        entry_fee: parseFloat(entryFee),
        max_participants: parseInt(maxEntries),
        rewards: [],
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        owner_id: 'current-user-id', // TODO: Get from auth context
        tournament_id: activeTournamentId,
      });

      // Reset form on success
      setGameName('');
      setTournamentName('');
      setGameType('private');
      setEntryFee('');
      setMaxEntries('');

      onSuccess?.();
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

      <Input
        label="Tournament (optional)"
        value={tournamentName}
        onChangeText={setTournamentName}
        placeholder="Tournament Name"
        placeholderTextColor={theme.colors.text.secondary}
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
        value={entryFee}
        onChangeText={(text) => {
          setEntryFee(text);
          if (fieldErrors.entryFee) {
            setFieldErrors((prev) => ({ ...prev, entryFee: undefined }));
          }
        }}
        placeholder="£40"
        keyboardType="numeric"
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
