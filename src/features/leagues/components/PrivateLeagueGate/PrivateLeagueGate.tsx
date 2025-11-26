import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { ScreenWrapper } from '~/components/ScreenWrapper/ScreenWrapper';
import {
  Container,
  ErrorText,
  JoinCodeInputContainer,
  PrivateLeagueCard,
  PrivateLeagueContainer,
  PrivateLeagueDescription,
  PrivateLeagueIcon,
  PrivateLeagueTitle,
} from './styles';

type PrivateLeagueGateProps = {
  joinCode: string;
  onJoinCodeChange: (code: string) => void;
  onSubmit: () => void;
  error?: string;
  hasAttemptedJoin: boolean;
};

export const PrivateLeagueGate = ({
  joinCode,
  onJoinCodeChange,
  onSubmit,
  error,
  hasAttemptedJoin,
}: PrivateLeagueGateProps) => {
  return (
    <ScreenWrapper title="Private League">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            <PrivateLeagueContainer>
              <PrivateLeagueCard>
                <PrivateLeagueIcon>🔒</PrivateLeagueIcon>
                <PrivateLeagueTitle>Private League</PrivateLeagueTitle>
                <PrivateLeagueDescription>
                  This league is private. Enter the join code to access it.
                </PrivateLeagueDescription>

                <JoinCodeInputContainer>
                  <Input
                    label="Join Code"
                    value={joinCode}
                    onChangeText={onJoinCodeChange}
                    placeholder="Enter join code"
                    autoCapitalize="characters"
                  />
                </JoinCodeInputContainer>

                {error ? <ErrorText>{error}</ErrorText> : null}
                {hasAttemptedJoin && !error ? (
                  <ErrorText>Invalid join code. Please try again.</ErrorText>
                ) : null}

                <Button
                  title="Join League"
                  onPress={onSubmit}
                  disabled={!joinCode.trim()}
                  fullWidth
                />
              </PrivateLeagueCard>
            </PrivateLeagueContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
