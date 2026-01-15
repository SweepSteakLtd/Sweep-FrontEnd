import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, BackHandler } from 'react-native';
import type { WebViewMessageEvent } from 'react-native-webview';
import WebView from 'react-native-webview';
import { Button } from '~/components/Button/Button';
import { paysafeCheckoutHtml } from '~/features/payment/webview/paysafe-checkout-html';
import { firebaseAuth } from '~/lib/firebase';
import type { RootStackParamList } from '~/navigation/types';
import { useConfirmPayment, useGetPublicKey } from '~/services/apis/Payment';
import { useGetUser } from '~/services/apis/User/useGetUser';
import {
  ButtonContainer,
  Container,
  ErrorContainer,
  ErrorIcon,
  ErrorMessage,
  ErrorTitle,
  LoadingContainer,
  LoadingText,
  WebViewContainer,
} from './styles';

type PaymentCheckoutRouteProp = RouteProp<RootStackParamList, 'PaymentCheckout'>;

/**
 * Message types sent from WebView to React Native
 */
interface WebViewMessage {
  type: 'sdk_ready' | 'payment_success' | 'payment_error' | 'payment_close';
  paymentHandleToken?: string;
  paymentMethod?: string;
  status?: string;
  error?: string;
  code?: string;
  correlationId?: string;
  stage?: string;
  expired?: boolean;
}

const PaymentCheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<PaymentCheckoutRouteProp>();
  const [webViewKey, setWebViewKey] = useState(0); // Used to force reload
  const { data: userData } = useGetUser();
  const { transactionId, amount, currency = 'GBP', type } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch public API key from backend
  const { data: publicKeyData, isLoading: isLoadingKey, error: keyError } = useGetPublicKey();

  // Confirm payment mutation
  const { mutate: confirmPayment } = useConfirmPayment();

  // Handle Android hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [navigation]);

  /**
   * Handle public key loading errors
   */
  useEffect(() => {
    if (keyError) {
      setHasError(true);
      setErrorMessage('Failed to load payment configuration. Please try again.');
      setIsLoading(false);
    }
  }, [keyError]);

  /**
   * Get the HTML source for WebView
   * Uses inline HTML string for better compatibility across platforms
   */
  const htmlSource = {
    html: paysafeCheckoutHtml,
    baseUrl: 'https://hosted.paysafe.com', // Allow Paysafe SDK to load properly
  };

  /**
   * Generate injected JavaScript to set payment config as global variable
   * This runs BEFORE the page content loads
   */
  const getInjectedJavaScriptBeforeContentLoaded = useCallback(() => {
    if (!publicKeyData) {
      return '';
    }

    const userId = firebaseAuth.currentUser?.uid || 'anonymous';
    const amountInPence = Math.round(amount * 100); // Convert pounds to pence
    const [year, month, day] = userData?.date_of_birth
      ? userData.date_of_birth.split('-').map((part) => parseInt(part, 10))
      : [];
    const config = {
      apiKey: publicKeyData.data.apiKey,
      amount: amountInPence,
      currency,
      environment: publicKeyData.data.environment,
      customerId: userId,
      merchantRefNum: transactionId,
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      email: userData?.email,
      phone: userData?.phone_number,
      type,
      billingAddress: {
        city: userData?.address?.town,
        country: userData?.address?.country,
        street: userData?.address?.line1,
        street2: userData?.address?.line2,
        zip: userData?.address?.postcode,
      },
      dateOfBirth: {
        day,
        month,
        year,
      },
    };

    return `
      window.__PAYMENT_CONFIG__ = ${JSON.stringify(config)};
      true;
    `;
  }, [amount, currency, publicKeyData, type, transactionId, userData]);

  /**
   * Handle messages from WebView
   */
  const handleWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const message: WebViewMessage = JSON.parse(event.nativeEvent.data);
        console.log('Received message from WebView:', message);

        switch (message.type) {
          case 'sdk_ready':
            setIsLoading(false);
            // Config is already available in window.__PAYMENT_CONFIG__
            // HTML will automatically initialize after SDK is ready
            break;

          case 'payment_success':
            console.log('Payment successful:', message.paymentHandleToken);
            setIsProcessing(true);

            if (message.paymentHandleToken) {
              // Call backend to confirm payment
              confirmPayment(
                {
                  transactionId,
                  paymentHandleToken: message.paymentHandleToken,
                  paymentMethod: message.paymentMethod,
                },
                {
                  onSuccess: (response) => {
                    console.log('Payment confirmed:', response);
                    setIsProcessing(false);

                    // Show success message
                    Alert.alert(
                      type === 'deposit' ? 'Deposit Successful' : 'Withdrawal Successful',
                      type === 'deposit'
                        ? `Your deposit of £${amount.toFixed(2)} has been processed successfully.`
                        : `Your withdrawal of £${amount.toFixed(2)} has been processed successfully.`,
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            // Navigate to Dashboard
                            navigation.reset({
                              index: 0,
                              routes: [{ name: 'Dashboard' }],
                            });
                          },
                        },
                      ],
                    );
                  },
                  onError: (error: any) => {
                    console.error('Payment confirmation failed:', error);
                    setIsProcessing(false);

                    // Show error message
                    Alert.alert(
                      'Payment Processing Error',
                      error?.message || 'Failed to process payment. Please contact support.',
                      [
                        {
                          text: 'OK',
                          onPress: () => navigation.goBack(),
                        },
                      ],
                    );
                  },
                },
              );
            } else {
              // No token received
              setIsProcessing(false);
              Alert.alert(
                'Payment Error',
                'Payment succeeded but no token was received. Please contact support.',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                  },
                ],
              );
            }
            break;

          case 'payment_error':
            console.error('Payment error:', message);

            // Show error alert
            Alert.alert(
              'Payment Failed',
              message.error || 'An error occurred while processing your payment. Please try again.',
              [
                {
                  text: 'Try Again',
                  onPress: () => {
                    // Reload WebView to retry by changing key
                    setIsLoading(true);
                    setWebViewKey((prev) => prev + 1);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => navigation.goBack(),
                },
              ],
            );
            break;

          case 'payment_close':
            console.log('Payment overlay closed:', message);

            // User cancelled payment, go back
            navigation.goBack();
            break;

          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing WebView message:', error);
      }
    },
    [navigation, transactionId, confirmPayment, amount],
  );

  /**
   * Handle WebView loading errors
   */
  const handleWebViewError = useCallback(() => {
    console.error('WebView failed to load');
    setIsLoading(false);
    setHasError(true);
    setErrorMessage('Unable to load payment processor. Please check your internet connection.');
  }, []);

  /**
   * Handle retry after error
   */
  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setWebViewKey((prev) => prev + 1);
  }, []);

  /**
   * Handle cancel
   */
  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Show error screen if WebView failed to load
  if (hasError) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Unable to Load Payment</ErrorTitle>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <ButtonContainer>
            <Button title="Try Again" onPress={handleRetry} variant="primary" fullWidth />
            <Button title="Cancel" onPress={handleCancel} variant="secondary" fullWidth />
          </ButtonContainer>
        </ErrorContainer>
      </Container>
    );
  }
  console.log('Rendering WebView with key:', webViewKey, isLoading, isLoadingKey, isProcessing);
  return (
    <Container>
      <WebViewContainer>
        <WebView
          key={webViewKey}
          source={htmlSource}
          injectedJavaScriptBeforeContentLoaded={getInjectedJavaScriptBeforeContentLoaded()}
          onMessage={handleWebViewMessage}
          onError={handleWebViewError}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          setSupportMultipleWindows={false}
          // Allow navigation to Paysafe hosted pages (for 3D Secure)
          onShouldStartLoadWithRequest={() => {
            // Allow all Paysafe domains and our HTML file
            return true;
          }}
          // Hide WebView until SDK is ready
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </WebViewContainer>

      {(isLoading || isLoadingKey || isProcessing) && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#2D6A4F" />
          <LoadingText>
            {isLoadingKey
              ? 'Loading payment configuration...'
              : isProcessing
                ? 'Processing payment...'
                : 'Loading payment processor...'}
          </LoadingText>
        </LoadingContainer>
      )}
    </Container>
  );
};

// Export with forwardRef to support React Navigation
export const PaymentCheckout = React.forwardRef<any, any>((props, _ref) => {
  return <PaymentCheckoutScreen {...props} />;
});

PaymentCheckout.displayName = 'PaymentCheckout';
