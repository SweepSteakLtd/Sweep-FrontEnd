/**
 * Paysafe Checkout HTML Bridge
 *
 * This HTML template is loaded in a WebView to integrate with the Paysafe Checkout SDK.
 * It handles initialization, payment processing, and communication with React Native
 * via postMessage.
 */
export const paysafeCheckoutHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    />
    <title>Paysafe Checkout</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif;
        background-color: #f5f5f5;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      #loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      #loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e0e0e0;
        border-top: 4px solid #2d6a4f;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      #loading-text {
        font-size: 16px;
        color: #666;
      }

      #error-container {
        display: none;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 24px;
        max-width: 400px;
        text-align: center;
      }

      #error-icon {
        font-size: 48px;
        color: #d32f2f;
      }

      #error-message {
        font-size: 16px;
        color: #333;
        line-height: 1.5;
      }

      .error-details {
        font-size: 12px;
        color: #666;
        background: #f9f9f9;
        padding: 8px 12px;
        border-radius: 4px;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <!-- Loading State -->
    <div id="loading-container">
      <div id="loading-spinner"></div>
      <div id="loading-text">Loading payment processor...</div>
    </div>

    <!-- Error State -->
    <div id="error-container">
      <div id="error-icon">⚠️</div>
      <div id="error-message">Unable to load payment processor</div>
      <div class="error-details" id="error-details"></div>
    </div>

    <!-- Paysafe Checkout SDK -->
    <script src="https://hosted.paysafe.com/checkout/v2/paysafe.checkout.min.js"></script>

    <script>
      // Global state
      let checkoutInstance = null;
      let config = null;

      // Utility: Send message to React Native
      function sendMessage(data) {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        } else {
          console.error("ReactNativeWebView is not available");
        }
      }

      // Show error state
      function showError(message, details = "") {
        document.getElementById("loading-container").style.display = "none";
        const errorContainer = document.getElementById("error-container");
        errorContainer.style.display = "flex";

        document.getElementById("error-message").textContent = message;

        if (details) {
          document.getElementById("error-details").textContent = details;
          document.getElementById("error-details").style.display = "block";
        } else {
          document.getElementById("error-details").style.display = "none";
        }
      }

      // Hide loading state
      function hideLoading() {
        document.getElementById("loading-container").style.display = "none";
      }

      // Initialize Paysafe Checkout
      // Config is passed via window.__PAYMENT_CONFIG__ from React Native
      function initPaysafeCheckout() {
        try {
          // Read config from global variable set by React Native
          config = window.__PAYMENT_CONFIG__ || {};

          // Validate required parameters
          if (!config.apiKey) {
            throw new Error("API key is required");
          }
          if (!config.amount || config.amount <= 0) {
            throw new Error("Valid amount is required");
          }
          const options = {
            currency: config.currency || "GBP",
            environment: "TEST",
            amount: config.amount,
            accounts: {
              CC: 1003051160,
            },
            locale: "en_US",
            displayPaymentMethods: ["card"],
            customer: {
              firstName: config.firstName || "",
              lastName: config.lastName || "",
              email: config.email || "",
              phone: config.phone || "",
              identityDocuments: [],
              dateOfBirth: config.dateOfBirth,
            },
            billingAddress: config.billingAddress,
            merchantRefNum: config.merchantRefNum,
            merchantDescriptor: {
              dynamicDescriptor: "ChipIn",
              phone: "0123456789",
            },
            threeDs: {
              deviceChannel: "BROWSER",
            },
            shippingDetails: {
              recipientName: config.firstName + " " + config.lastName,
              ...config.billingAddress,
            },
            simulator: "EXTERNAL",
            paymentMethodDetails: {
              card: {
                accountId: "1003051160",
              },
            },
            payout: config.type === "withdrawal",
            // singleUseCustomerToken: "SPP2YHcOKjdqofR2",
            canEditAmount: config.type !== "withdrawal",
          };

          // Result callback - called when payment is completed or fails
          const resultCallback = (instance, error, result) => {
            console.log("Paysafe resultCallback:", { error, result });

            if (error) {
              // Payment failed
              sendMessage({
                type: "payment_error",
                error:
                  error.displayMessage || error.message || "Payment failed",
                code: error.code || "UNKNOWN",
                correlationId: error.correlationId || "",
              });
            } else if (result && result.paymentHandleToken
) {
              // Payment successful
              sendMessage({
                type: "payment_success",
                paymentHandleToken: result.paymentHandleToken,
                paymentMethod: result.paymentMethod || "CARD",
                status: result.status || "PAYABLE",
                gatewayResponse: result.gatewayResponse || {},
              });
            } else {
              // Unexpected result
              sendMessage({
                type: "payment_error",
                error: "Unexpected result from payment processor",
                code: "UNEXPECTED_RESULT",
              });
            }
          };

          // Close callback - called when overlay is closed
          const closeCallback = (instance, result) => {
            console.log("Paysafe closeCallback:", result);

            sendMessage({
              type: "payment_close",
              stage: result?.stage || "UNKNOWN",
              expired: result?.expired || false,
            });
          };

          // Risk callback - optional callback for risk validation
          const riskCallback = (instance, riskResult) => {
            console.log("Paysafe riskCallback:", riskResult);

            // Accept by default (implement custom risk logic here if needed)
            instance.accept();
          };

          // Initialize Paysafe Checkout
          console.log("Initializing Paysafe Checkout with config:", {
            ...options,
            // apiKey: '***' // Don't log the full API key
          });

          checkoutInstance = paysafe.checkout.setup(
            config.apiKey,
            options,
            resultCallback,
            closeCallback
          );

          // Hide loading and open checkout overlay
          hideLoading();

          console.log("Paysafe Checkout initialized successfully");
        } catch (err) {
          console.error("Error initializing Paysafe Checkout:", err);
          showError(
            "Failed to initialize payment",
            err.message || "Unknown error"
          );

          sendMessage({
            type: "payment_error",
            error: err.message || "Failed to initialize payment",
            code: "INIT_ERROR",
          });
        }
      }

      // Check if Paysafe SDK loaded successfully
      window.addEventListener("load", () => {
        if (typeof paysafe === "undefined") {
          showError(
            "Payment SDK failed to load",
            "Please check your internet connection and try again"
          );

          sendMessage({
            type: "payment_error",
            error: "Payment SDK failed to load",
            code: "SDK_LOAD_ERROR",
          });
        } else {
          console.log("Paysafe SDK loaded successfully");

          // Notify React Native that SDK is ready
          sendMessage({
            type: "sdk_ready",
          });

          // Automatically initialize with config from window.__PAYMENT_CONFIG__
          if (window.__PAYMENT_CONFIG__) {
            console.log(
              "Auto-initializing Paysafe Checkout with provided config"
            );
            initPaysafeCheckout();
          } else {
            console.error(
              "No payment config found in window.__PAYMENT_CONFIG__"
            );
            showError("Payment configuration missing", "Please try again");
            sendMessage({
              type: "payment_error",
              error: "Payment configuration missing",
              code: "CONFIG_MISSING",
            });
          }
        }
      });

      // Handle errors
      window.addEventListener("error", (event) => {
        console.error("Global error:", event.error);

        showError(
          "An unexpected error occurred",
          event.error?.message || "Please try again"
        );

        sendMessage({
          type: "payment_error",
          error: event.error?.message || "An unexpected error occurred",
          code: "GLOBAL_ERROR",
        });
      });
    </script>
  </body>
</html>

`;
