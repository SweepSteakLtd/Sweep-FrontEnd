import React, { createContext, useCallback, useContext, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';
import { AlertContainer, AlertMessage, AlertTitle, ButtonContainer, Overlay } from './styles';

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
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions(options);
    setVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setVisible(false);
    setTimeout(() => setAlertOptions(null), 300);
  }, []);

  const handleButtonPress = useCallback(
    (onPress?: () => void) => {
      hideAlert();
      onPress?.();
    },
    [hideAlert],
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={hideAlert}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={hideAlert}>
          <Overlay>
            <TouchableOpacity activeOpacity={1}>
              <AlertContainer theme={theme}>
                {alertOptions && (
                  <>
                    <AlertTitle>
                      <Typography
                        variant="subheading"
                        color={theme.colors.text.secondary}
                        weight="bold"
                      >
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
                            variant={button.style === 'destructive' ? 'primary' : 'outline'}
                            onPress={() => handleButtonPress(button.onPress)}
                            style={{ flex: 1, marginLeft: index > 0 ? 12 : 0 }}
                          >
                            {button.text}
                          </Button>
                        ))
                      ) : (
                        <Button variant="primary" onPress={hideAlert} style={{ flex: 1 }}>
                          OK
                        </Button>
                      )}
                    </ButtonContainer>
                  </>
                )}
              </AlertContainer>
            </TouchableOpacity>
          </Overlay>
        </TouchableOpacity>
      </Modal>
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
