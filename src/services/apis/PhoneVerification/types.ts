export interface SendVerificationResponse {
  success: boolean;
  verificationId?: string;
  message?: string;
}

export interface VerifyCodeResponse {
  success: boolean;
  message?: string;
}
