import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useState } from 'react';
import { z } from 'zod';
import { useAlert } from '~/components/Alert/Alert';
import { firebaseAuth } from '~/lib/firebase';
import { passwordSchema } from '~/lib/validation/passwordSchema';
import { getPasswordErrorMessage } from './utils/passwordErrors';

// Zod schema for password change form
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

interface FieldErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useChangePassword = () => {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const changePassword = async (formData: ChangePasswordFormData) => {
    const currentUser = firebaseAuth.currentUser;

    // Clear previous errors
    setErrors({});

    // Validate user is signed in
    if (!currentUser?.email) {
      showAlert({
        title: 'Error',
        message: 'No user is currently signed in.',
      });
      return { success: false };
    }

    // Validate form data with Zod
    const validation = changePasswordSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FieldErrors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      // Don't show alert for validation errors - just display field errors
      return { success: false, errors: fieldErrors };
    }

    setLoading(true);

    try {
      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(currentUser.email, formData.currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Update password
      await updatePassword(currentUser, formData.newPassword);

      // Show success alert
      showAlert({
        title: 'Success',
        message: 'Your password has been updated successfully.',
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating password:', error);

      // Get declarative error message
      const errorResponse = getPasswordErrorMessage(error);

      // Handle field-specific errors
      const fieldErrors: FieldErrors = {};
      if (errorResponse.fieldError) {
        fieldErrors[errorResponse.fieldError.field] = errorResponse.fieldError.message;
        setErrors(fieldErrors);
      }

      // Show alert only if specified (for non-field-specific errors)
      if (errorResponse.showAlert) {
        showAlert({
          title: errorResponse.title,
          message: errorResponse.message,
        });
      }

      return { success: false, errors: fieldErrors };
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
    errors,
    clearErrors: () => setErrors({}),
  };
};
