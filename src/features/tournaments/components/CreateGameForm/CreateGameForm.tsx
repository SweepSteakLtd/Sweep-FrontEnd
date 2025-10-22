import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { RadioButton } from '~/components/RadioButton/RadioButton';
import { useCreateGame } from '~/services/apis/Game/useCreateGame';
import { ButtonContainer, ErrorText, FormInput, FormTitle, InputLabel, RadioGroup } from './styles';

interface CreateGameFormProps {
  activeTournamentId: string;
  onSuccess?: () => void;
}

export const CreateGameForm = ({ activeTournamentId, onSuccess }: CreateGameFormProps) => {
  const theme = useTheme();
  const createGameMutation = useCreateGame();

  const [gameName, setGameName] = useState('');
  const [tournamentName, setTournamentName] = useState('');
  const [gameType, setGameType] = useState<'public' | 'private'>('private');
  const [entryFee, setEntryFee] = useState('');
  const [maxEntries, setMaxEntries] = useState('');
  const [createError, setCreateError] = useState('');

  const handleCreateGame = async () => {
    // Validation
    if (!gameName.trim()) {
      setCreateError('Please enter a game name');
      return;
    }
    if (!entryFee || parseFloat(entryFee) <= 0) {
      setCreateError('Please enter a valid entry fee');
      return;
    }
    if (!maxEntries || parseInt(maxEntries) <= 0) {
      setCreateError('Please enter valid max participants');
      return;
    }

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
      <FormTitle>Create Private Game</FormTitle>

      <InputLabel>Game Name</InputLabel>
      <FormInput
        value={gameName}
        onChangeText={setGameName}
        placeholder="Game Name"
        placeholderTextColor={theme.colors.text.secondary}
      />

      <InputLabel>Tournament (optional)</InputLabel>
      <FormInput
        value={tournamentName}
        onChangeText={setTournamentName}
        placeholder="Tournament Name"
        placeholderTextColor={theme.colors.text.secondary}
      />

      <InputLabel>Game Type</InputLabel>
      <RadioGroup>
        <RadioButton
          label="Public"
          selected={gameType === 'public'}
          onPress={() => setGameType('public')}
        />
        <RadioButton
          label="Private"
          selected={gameType === 'private'}
          onPress={() => setGameType('private')}
        />
      </RadioGroup>

      <InputLabel>Entry Fee (min £20 max £1500)</InputLabel>
      <FormInput
        value={entryFee}
        onChangeText={setEntryFee}
        placeholder="£40"
        keyboardType="numeric"
        placeholderTextColor={theme.colors.text.secondary}
      />

      <InputLabel>Max ENTRIES per user</InputLabel>
      <FormInput
        value={maxEntries}
        onChangeText={setMaxEntries}
        placeholder="=3"
        keyboardType="numeric"
        placeholderTextColor={theme.colors.text.secondary}
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
