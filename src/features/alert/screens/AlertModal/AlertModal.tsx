import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '~/components/Button/Button';
import { Typography } from '~/components/Typography/Typography';
import type { RootStackParamList } from '~/navigation/types';
import { AlertMessage, AlertTitle, ButtonContainer, Container, ContentContainer } from './styles';

type AlertModalRouteProp = RouteProp<RootStackParamList, 'AlertModal'>;

export const AlertModal = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<AlertModalRouteProp>();

  const { title, message, buttons } = route.params;

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const handleDismiss = (callback?: () => void) => {
    navigation.goBack();
    callback?.();
  };

  return (
    <Container>
      <ContentContainer>
        <AlertTitle>
          <Typography variant="subheading" color={theme.colors.text.secondary} weight="bold">
            {title}
          </Typography>
        </AlertTitle>

        <AlertMessage>
          <Typography variant="body" color={theme.colors.text.secondary}>
            {message}
          </Typography>
        </AlertMessage>

        <ButtonContainer>
          {buttons && buttons.length > 0 ? (
            buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.style === 'destructive' ? 'primary' : 'secondary'}
                title={button.text}
                onPress={() => handleDismiss(button.onPress)}
                style={{ flex: 1, marginLeft: index > 0 ? 12 : 0 }}
              />
            ))
          ) : (
            <Button
              variant="primary"
              title="OK"
              onPress={() => handleDismiss()}
              style={{ flex: 1 }}
            />
          )}
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};
