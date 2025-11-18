import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Dropdown } from '~/components/Dropdown/Dropdown';
import { Input } from '~/components/Input/Input';
import { Switch } from '~/components/Switch/Switch';
import { Typography } from '~/components/Typography/Typography';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import { useCreateLeague } from '~/services/apis/League/useCreateLeague';
import type { Tournament } from '~/services/apis/Tournament/types';
import { poundsToPence } from '~/utils/currency';
import { TimeSelectField } from '../TimeSelectField/TimeSelectField';
import { ErrorText, FormContainer, LeagueTypeRow, SwitchLabel } from './styles';
import { createLeagueSchema } from './validation';

interface CreateLeagueFormProps {
  activeTournamentId: string;
  tournaments: Tournament[];
  defaultLeagueType?: 'public' | 'private';
  onSuccess?: () => void;
  onPrivateLeagueCreated?: (joinCode: string, leagueName: string) => void;
  onSubmit?: (handleCreateLeague: () => Promise<void>) => void;
}

interface FieldErrors extends Record<string, string | undefined> {
  leagueName?: string;
  description?: string;
  tournamentId?: string;
  entryFee?: string;
  maxEntries?: string;
  startTime?: string;
  endTime?: string;
}

export const CreateLeagueForm = ({
  activeTournamentId,
  tournaments,
  defaultLeagueType = 'public',
  onSuccess,
  onPrivateLeagueCreated,
  onSubmit,
}: CreateLeagueFormProps) => {
  const theme = useTheme();
  const createLeagueMutation = useCreateLeague();

  const [leagueName, setLeagueName] = useState('');
  const [description, setDescription] = useState('');
  const [leagueType, setLeagueType] = useState<'public' | 'private'>(defaultLeagueType);
  const [selectedTournamentId, setSelectedTournamentId] = useState(activeTournamentId);
  const [entryFee, setEntryFee] = useState('');
  const [maxEntries, setMaxEntries] = useState('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [createError, setCreateError] = useState('');

  const tournamentOptions = tournaments
    .filter((t) => t.id && t.name)
    .map((t) => ({
      label: t.name!,
      value: t.id!,
    }));

  const handleCreateLeague = async () => {
    // Validate all fields
    const validation = validateWithZod<FieldErrors>(createLeagueSchema, {
      leagueName,
      description,
      tournamentId: selectedTournamentId,
      entryFee,
      maxEntries,
      startTime,
      endTime,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setCreateError('');

    // Ensure start time is not in the past
    const now = new Date();
    const adjustedStartTime = startTime < now ? now : startTime;

    try {
      const response = await createLeagueMutation.mutateAsync({
        name: leagueName,
        description: description || undefined,
        entry_fee: poundsToPence(entryFee),
        max_participants: parseInt(maxEntries),
        rewards: [],
        start_time: adjustedStartTime.toISOString(),
        end_time: endTime.toISOString(),
        tournament_id: selectedTournamentId,
        type: leagueType,
      });

      // Reset form on success
      setLeagueName('');
      setDescription('');
      setSelectedTournamentId(activeTournamentId);
      setEntryFee('');
      setMaxEntries('');
      setStartTime(new Date());
      setEndTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

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

  // Expose the handler to parent component
  useEffect(() => {
    onSubmit?.(handleCreateLeague);
  }, [
    leagueName,
    description,
    selectedTournamentId,
    entryFee,
    maxEntries,
    startTime,
    endTime,
    leagueType,
  ]);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <FormContainer>
        <LeagueTypeRow>
          <Typography
            variant="label"
            color={theme.colors.text.tertiary}
            style={{ fontSize: 12, fontWeight: '400' }}
          >
            League Type
          </Typography>
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
          label="League Name"
          value={leagueName}
          onChangeText={(text) => {
            setLeagueName(text);
            if (fieldErrors.leagueName) {
              setFieldErrors((prev) => ({ ...prev, leagueName: undefined }));
            }
          }}
          placeholder="Enter league name"
          placeholderTextColor={theme.colors.text.secondary}
          error={fieldErrors.leagueName}
        />

        <Input
          label="Description (Optional)"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (fieldErrors.description) {
              setFieldErrors((prev) => ({ ...prev, description: undefined }));
            }
          }}
          placeholder="Enter a description for your league"
          placeholderTextColor={theme.colors.text.secondary}
          error={fieldErrors.description}
          multiline
          numberOfLines={3}
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
          label="Max entries per user"
          value={maxEntries}
          onChangeText={(text) => {
            setMaxEntries(text);
            if (fieldErrors.maxEntries) {
              setFieldErrors((prev) => ({ ...prev, maxEntries: undefined }));
            }
          }}
          placeholder="3"
          keyboardType="numeric"
          placeholderTextColor={theme.colors.text.secondary}
          error={fieldErrors.maxEntries}
        />

        <TimeSelectField
          label="Start Time"
          value={startTime}
          onValueChange={(date) => {
            setStartTime(date);
            if (fieldErrors.startTime) {
              setFieldErrors((prev) => ({ ...prev, startTime: undefined }));
            }
          }}
          minimumDate={new Date()}
          error={fieldErrors.startTime}
        />

        <TimeSelectField
          label="End Time"
          value={endTime}
          onValueChange={(date) => {
            setEndTime(date);
            if (fieldErrors.endTime) {
              setFieldErrors((prev) => ({ ...prev, endTime: undefined }));
            }
          }}
          minimumDate={startTime}
          error={fieldErrors.endTime}
        />

        {createError ? <ErrorText style={{ marginTop: 16 }}>{createError}</ErrorText> : null}
      </FormContainer>
    </ScrollView>
  );
};
