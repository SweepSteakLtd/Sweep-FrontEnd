import React, { createContext, useCallback, useContext, useState } from 'react';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components/native';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { AlertContainer, AlertMessage, AlertTitle, ButtonContainer, Container } from './styles';

interface AlertOptions {
  title: string;
  message: string;
  buttons?: Array<{
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }>;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
    setContentVisible(false);
    setTimeout(() => setAlertOptions(null), 300);
  }, []);

  const handleModalShow = useCallback(() => {
    setContentVisible(true);
  }, []);

  const handleButtonPress = useCallback(
    (onPress?: () => void) => {
      hideAlert();
      if (onPress) {
        setTimeout(() => onPress(), 300);
      }
    },
    [hideAlert],
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Container>
        {children}
        <Modal
          isVisible={visible}
          onBackdropPress={hideAlert}
          onBackButtonPress={hideAlert}
          onModalShow={handleModalShow}
          backdropOpacity={0.5}
          animationIn="fadeIn"
          animationOut="fadeOut"
          useNativeDriver
          useNativeDriverForBackdrop
          style={{ justifyContent: 'center', alignItems: 'center', margin: 0 }}
          coverScreen
          hasBackdrop
        >
          {contentVisible && alertOptions && (
            <AlertContainer>
              <AlertTitle>
                <Typography variant="subheading" color={theme.colors.text.secondary} weight="bold">
                  {alertOptions.title}
                </Typography>
              </AlertTitle>

              <AlertMessage>
                <Typography variant="body" color={theme.colors.text.secondary}>
                  {alertOptions.message}
                </Typography>
              </AlertMessage>

              <ButtonContainer>
                {alertOptions.buttons && alertOptions.buttons.length > 0 ? (
                  alertOptions.buttons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.style === 'destructive' ? 'primary' : 'secondary'}
                      onPress={() => handleButtonPress(button.onPress)}
                      style={{ flex: 1, marginLeft: index > 0 ? 12 : 0 }}
                    >
                      {button.text}
                    </Button>
                  ))
                ) : (
                  <Button variant="primary" onPress={hideAlert} style={{ flex: 1 }}>
                    Ok
                  </Button>
                )}
              </ButtonContainer>
            </AlertContainer>
          )}
        </Modal>
      </Container>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};
