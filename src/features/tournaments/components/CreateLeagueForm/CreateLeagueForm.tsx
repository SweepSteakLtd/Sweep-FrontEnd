import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Dropdown } from '~/components/Dropdown/Dropdown';
import { Input } from '~/components/Input/Input';
import { Switch } from '~/components/Switch/Switch';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import { useCreateLeague } from '~/services/apis/League/useCreateLeague';
import type { Tournament } from '~/services/apis/Tournament/types';
import { ButtonContainer, ErrorText, LeagueTypeRow, InputLabel, SwitchLabel } from './styles';
import { createLeagueSchema } from './validation';

interface CreateLeagueFormProps {
  activeTournamentId: string;
  tournaments: Tournament[];
  defaultLeagueType?: 'public' | 'private';
  onSuccess?: () => void;
  onPrivateLeagueCreated?: (joinCode: string, leagueName: string) => void;
}

interface FieldErrors extends Record<string, string | undefined> {
  leagueName?: string;
  tournamentId?: string;
  entryFee?: string;
  maxEntries?: string;
}

export const CreateLeagueForm = ({
  activeTournamentId,
  tournaments,
  defaultLeagueType = 'public',
  onSuccess,
  onPrivateLeagueCreated,
}: CreateLeagueFormProps) => {
  const theme = useTheme();
  const createLeagueMutation = useCreateLeague();

  const [leagueName, setLeagueName] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState(activeTournamentId);
  const [leagueType, setLeagueType] = useState<'public' | 'private'>(defaultLeagueType);
  const [entryFee, setEntryFee] = useState('');
  const [maxEntries, setMaxEntries] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createError, setCreateError] = useState('');

  const tournamentOptions = tournaments
    .filter((t) => t.id && t.name)
    .map((t) => ({
      label: t.name!,
      value: t.id!,
    }));

  const handleCreateLeague = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(createLeagueSchema, {
      leagueName,
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
      const response = await createLeagueMutation.mutateAsync({
        name: leagueName,
        description: '',
        entry_fee: parseFloat(entryFee),
        max_participants: parseInt(maxEntries),
        rewards: [],
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        owner_id: 'current-user-id', // TODO: Get from auth context
        tournament_id: selectedTournamentId,
        type: leagueType,
      });

      // Reset form on success
      setLeagueName('');
      setSelectedTournamentId(activeTournamentId);
      setEntryFee('');
      setMaxEntries('');

      // If private league, call the callback to show join code
      if (leagueType === 'private' && response.join_code) {
        onPrivateLeagueCreated?.(response.join_code, leagueName);
      } else {
        // For public leagues, call onSuccess immediately
        onSuccess?.();
      }

      console.log('League created successfully');
    } catch (error) {
      setCreateError('Failed to create league. Please try again.');
      console.error('Error creating league:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Input
        label="League Name"
        value={leagueName}
        onChangeText={(text) => {
          setLeagueName(text);
          if (fieldErrors.leagueName) {
            setFieldErrors((prev) => ({ ...prev, leagueName: undefined }));
          }
        }}
        placeholder="League Name"
        placeholderTextColor={theme.colors.text.secondary}
        error={fieldErrors.leagueName}
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

      <LeagueTypeRow>
        <InputLabel>League Type</InputLabel>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <SwitchLabel isActive={leagueType === 'public'}>Public</SwitchLabel>
          <Switch
            value={leagueType === 'private'}
            onValueChange={(value) => setLeagueType(value ? 'private' : 'public')}
          />
          <SwitchLabel isActive={leagueType === 'private'}>Private</SwitchLabel>
        </View>
      </LeagueTypeRow>

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
          onPress={handleCreateLeague}
          disabled={createLeagueMutation.isPending}
          loading={createLeagueMutation.isPending}
        >
          CREATE LEAGUE
        </Button>
      </ButtonContainer>
    </View>
  );
};
