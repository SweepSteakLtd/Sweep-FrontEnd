import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { useRef, useState } from 'react';
import type { Address } from '~/components/AddressLookup/AddressLookup';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { poundsToPence } from '~/utils/currency';
import type { PhoneNumberStepHandle } from '../components/PhoneNumberStep/PhoneNumberStep';
import type { VerificationCodeStepHandle } from '../components/VerificationCodeStep/VerificationCodeStep';
import {
  basicInfoSchema,
  createProfileSchema,
  personalDetailsSchema,
} from '../screens/CreateProfile/validation';
import { useCreateProfile } from './useCreateProfile';
import { usePhoneVerification } from './usePhoneVerification';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface FieldErrors extends Record<string, string | undefined> {
  firstName?: string;
  lastName?: string;
  nickname?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address1?: string;
  city?: string;
  postcode?: string;
  bio?: string;
  depositLimitDaily?: string;
  depositLimitWeekly?: string;
  depositLimitMonthly?: string;
  bettingLimit?: string;
}

interface FormData {
  // Step 1: Basic Info
  firstName: string;
  lastName: string;
  nickname: string;
  // Step 2 & 3: Phone Verification
  phoneNumber: string;
  verifiedPhoneNumber: string;
  phoneVerified: boolean;
  // Step 4: Personal Details
  dateOfBirth?: Date;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  // Step 5: Bio
  bio: string;
  // Step 6: Deposit Limits
  depositLimitDaily: string;
  depositLimitWeekly: string;
  depositLimitMonthly: string;
  // Step 7: Stake Limit
  bettingLimit: string;
}

const TOTAL_STEPS = 7;

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  nickname: '',
  phoneNumber: '',
  verifiedPhoneNumber: '',
  phoneVerified: false,
  dateOfBirth: undefined,
  address1: '',
  address2: '',
  address3: '',
  city: '',
  county: '',
  postcode: '',
  bio: '',
  depositLimitDaily: '',
  depositLimitWeekly: '',
  depositLimitMonthly: '',
  bettingLimit: '',
};

export type ScreenState = 'form' | 'loading' | 'success' | 'error';

export const useCreateProfileForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const phoneNumberRef = useRef<PhoneNumberStepHandle>(null);
  const verificationCodeRef = useRef<VerificationCodeStepHandle>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [screenState, setScreenState] = useState<ScreenState>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingComplete, setLoadingComplete] = useState(false);

  const { createProfile, loading } = useCreateProfile();
  const phoneVerification = usePhoneVerification();

  // Map field names to their corresponding steps
  const getStepForField = (fieldName: string): number | null => {
    const fieldToStepMap: Record<string, number> = {
      firstName: 1,
      lastName: 1,
      nickname: 1,
      phoneNumber: 2,
      dateOfBirth: 4,
      address1: 4,
      city: 4,
      postcode: 4,
      bio: 5,
      depositLimitDaily: 6,
      depositLimitWeekly: 6,
      depositLimitMonthly: 6,
      bettingLimit: 7,
    };
    return fieldToStepMap[fieldName] ?? null;
  };

  // Field update helpers
  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field as string]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateAddress = (address: Address) => {
    setFormData((prev) => ({
      ...prev,
      address1: address.address1,
      address2: address.address2,
      address3: address.address3,
      city: address.city,
      county: address.county,
      postcode: address.postcode,
    }));
    // Clear address-related errors
    setFieldErrors((prev) => ({
      ...prev,
      address1: undefined,
      city: undefined,
      postcode: undefined,
    }));
  };

  // Step validation logic using Zod schemas
  const validateStep = async (step: number): Promise<boolean> => {
    setFieldErrors({});

    switch (step) {
      case 1: {
        // Basic Info - validate with Zod
        const validation = validateWithZod<FieldErrors>(basicInfoSchema, {
          firstName: formData.firstName,
          lastName: formData.lastName,
        });

        if (!validation.success) {
          setFieldErrors(validation.errors);
          return false;
        }
        return true;
      }

      case 2:
        // Phone Number Entry - delegate to component ref
        if (phoneNumberRef.current) {
          return await phoneNumberRef.current.handleNext();
        }
        return false;

      case 3:
        // Verification Code - delegate to component ref
        if (verificationCodeRef.current) {
          return await verificationCodeRef.current.handleNext();
        }
        return false;

      case 4: {
        // Personal Details - validate with Zod
        const validation = validateWithZod<FieldErrors>(personalDetailsSchema, {
          dateOfBirth: formData.dateOfBirth,
          address1: formData.address1,
          city: formData.city,
          postcode: formData.postcode,
        });

        if (!validation.success) {
          setFieldErrors(validation.errors);
          return false;
        }
        return true;
      }

      case 5:
        // Bio - optional, always valid
        return true;

      case 6:
      case 7:
        // Deposit and stake limits - optional, always valid
        // Final validation happens on submit
        return true;

      default:
        return true;
    }
  };

  // Navigation actions
  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFieldErrors({});
    }
  };

  // Phone verification handlers
  const handlePhoneVerified = () => {
    setFormData((prev) => ({
      ...prev,
      phoneVerified: true,
      verifiedPhoneNumber: prev.phoneNumber,
    }));
  };

  const handlePhoneNumberChange = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: text,
      phoneVerified:
        prev.verifiedPhoneNumber && text !== prev.verifiedPhoneNumber ? false : prev.phoneVerified,
    }));
    if (fieldErrors.phoneNumber) {
      setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  // Form submission
  const handleSubmit = async (): Promise<void> => {
    const validation = validateWithZod<FieldErrors>(createProfileSchema, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      depositLimitDaily: formData.depositLimitDaily,
      depositLimitWeekly: formData.depositLimitWeekly,
      depositLimitMonthly: formData.depositLimitMonthly,
      bettingLimit: formData.bettingLimit,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);

      // Navigate to the first step with an error
      const errorField = Object.keys(validation.errors)[0];
      const stepForField = getStepForField(errorField);
      if (stepForField) {
        setCurrentStep(stepForField);
      }
      return;
    }

    setFieldErrors({});
    setScreenState('loading');
    setLoadingComplete(false);

    const result = await createProfile({
      first_name: formData.firstName,
      last_name: formData.lastName,
      nickname: formData.nickname || undefined,
      phone_number: formData.phoneNumber,
      date_of_birth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : '',
      bio: formData.bio || undefined,
      deposit_limit: {
        daily: formData.depositLimitDaily ? poundsToPence(formData.depositLimitDaily) : undefined,
        weekly: formData.depositLimitWeekly
          ? poundsToPence(formData.depositLimitWeekly)
          : undefined,
        monthly: formData.depositLimitMonthly
          ? poundsToPence(formData.depositLimitMonthly)
          : undefined,
      },
      betting_limit: formData.bettingLimit ? poundsToPence(formData.bettingLimit) : undefined,
      address: {
        line1: formData.address1,
        line2: formData.address2 || undefined,
        line3: formData.address3 || undefined,
        town: formData.city,
        county: formData.county || undefined,
        postcode: formData.postcode,
        country: 'GB',
      },
    });

    if (result.success) {
      // Signal loading complete so progress bar completes to 100%
      setLoadingComplete(true);
      // Wait for progress bar to reach 100%, then show success
      setTimeout(() => {
        setScreenState('success');
        // Navigate to dashboard after celebration
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 3000);
      }, 500);
    } else if (result.error) {
      setErrorMessage(result.error);
      setScreenState('error');
    }
  };

  const handleRetry = () => {
    setScreenState('form');
    setErrorMessage('');
    setLoadingComplete(false);
  };

  return {
    // State
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    fieldErrors,
    loading,
    screenState,
    errorMessage,
    loadingComplete,

    // Refs
    phoneNumberRef,
    verificationCodeRef,

    // Phone verification
    phoneVerification,

    // Actions
    updateField,
    updateAddress,
    handleNext,
    handleBack,
    handlePhoneVerified,
    handlePhoneNumberChange,
    handleSubmit,
    handleRetry,
    navigation,
  };
};
