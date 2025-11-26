import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { useJoinLeague } from '~/services/apis/League/useJoinLeague';
import {
  ButtonContainer,
  Container,
  ContentContainer,
  ErrorText,
  InputContainer,
  Subtitle,
  Title,
} from './styles';

type JoinCodeModalRouteProp = RouteProp<RootStackParamList, 'JoinCodeModal'>;
type JoinCodeModalNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const JoinCodeModal = () => {
  const theme = useTheme();
  const navigation = useNavigation<JoinCodeModalNavigationProp>();
  const route = useRoute<JoinCodeModalRouteProp>();

  const { leagueId, leagueName } = route.params;
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  const joinLeagueMutation = useJoinLeague();

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) {
      setError('Please enter a join code');
      return;
    }

    setError('');

    try {
      await joinLeagueMutation.mutateAsync({
        league_id: leagueId,
        join_code: joinCode.trim(),
      });

      navigation.goBack();
      // Navigate to the league home after successful join
      navigation.navigate('LeagueHome', { leagueId });
    } catch (err) {
      setError('Invalid join code. Please try again.');
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Title>
          <Typography variant="subheading" color={theme.colors.text.secondary} weight="bold">
            Join Private League
          </Typography>
        </Title>

        <Subtitle>
          <Typography variant="body" color={theme.colors.text.tertiary}>
            Enter the passcode to join "{leagueName}"
          </Typography>
        </Subtitle>

        <InputContainer>
          <Input
            label="Join Code"
            value={joinCode}
            onChangeText={(text) => {
              setJoinCode(text);
              setError('');
            }}
            placeholder="Enter passcode"
            autoCapitalize="characters"
            autoFocus
          />
          {error ? <ErrorText>{error}</ErrorText> : null}
        </InputContainer>

        <ButtonContainer>
          <Button variant="secondary" title="Cancel" onPress={handleCancel} style={{ flex: 1 }} />
          <Button
            variant="primary"
            title="Join"
            onPress={handleJoin}
            loading={joinLeagueMutation.isPending}
            disabled={!joinCode.trim()}
            style={{ flex: 1 }}
          />
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};
