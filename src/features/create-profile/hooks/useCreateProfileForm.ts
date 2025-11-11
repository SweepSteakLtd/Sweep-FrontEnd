import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import type { Address } from '~/components/AddressLookup/AddressLookup';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
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
  phoneNumber?: string;
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
  // Step 2 & 3: Phone Verification
  phoneNumber: string;
  verifiedPhoneNumber: string;
  phoneVerified: boolean;
  // Step 4: Personal Details
  dateOfBirth?: Date;
  address1: string;
  address2: string;
  city: string;
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
  phoneNumber: '',
  verifiedPhoneNumber: '',
  phoneVerified: false,
  dateOfBirth: undefined,
  address1: '',
  address2: '',
  city: '',
  postcode: '',
  bio: '',
  depositLimitDaily: '500',
  depositLimitWeekly: '2000',
  depositLimitMonthly: '5000',
  bettingLimit: '100',
};

export const useCreateProfileForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const phoneNumberRef = useRef<PhoneNumberStepHandle>(null);
  const verificationCodeRef = useRef<VerificationCodeStepHandle>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const { createProfile, loading } = useCreateProfile();
  const phoneVerification = usePhoneVerification();

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
      city: address.city,
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
  const handleSubmit = async () => {
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
      return;
    }

    setFieldErrors({});

    const success = await createProfile({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phoneNumber,
      bio: formData.bio || undefined,
      deposit_limit: formData.depositLimitDaily
        ? parseInt(formData.depositLimitDaily, 10)
        : undefined,
      betting_limit: formData.bettingLimit ? parseInt(formData.bettingLimit, 10) : undefined,
    });

    if (success) {
      navigation.navigate('Dashboard');
    }
  };

  return {
    // State
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    fieldErrors,
    loading,

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
  };
};
