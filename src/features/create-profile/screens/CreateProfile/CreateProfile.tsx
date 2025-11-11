import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { ProgressIndicator } from '~/components/ProgressIndicator/ProgressIndicator';
import { AnimatedStepContainer } from '~/features/create-profile/components/AnimatedStepContainer/AnimatedStepContainer';
import { BasicInfoStep } from '~/features/create-profile/components/BasicInfoStep/BasicInfoStep';
import { BioStep } from '~/features/create-profile/components/BioStep/BioStep';
import { DepositLimitStep } from '~/features/create-profile/components/DepositLimitStep/DepositLimitStep';
import { PersonalDetailsStep } from '~/features/create-profile/components/PersonalDetailsStep/PersonalDetailsStep';
import {
  PhoneNumberStep,
  type PhoneNumberStepHandle,
} from '~/features/create-profile/components/PhoneNumberStep/PhoneNumberStep';
import { StakeLimitStep } from '~/features/create-profile/components/StakeLimitStep/StakeLimitStep';
import {
  VerificationCodeStep,
  type VerificationCodeStepHandle,
} from '~/features/create-profile/components/VerificationCodeStep/VerificationCodeStep';
import { useCreateProfile } from '~/features/create-profile/hooks/useCreateProfile';
import { usePhoneVerification } from '~/features/create-profile/hooks/usePhoneVerification';
import { validateWithZod } from '~/lib/validation/zodHelpers';
import type { RootStackParamList } from '~/navigation/types';
import { ButtonGroup, Container, StepsContainer } from './styles';
import { createProfileSchema } from './validation';

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

export const CreateProfile = () => {
  const navigation = useNavigation<NavigationProp>();
  const phoneNumberRef = useRef<PhoneNumberStepHandle>(null);
  const verificationCodeRef = useRef<VerificationCodeStepHandle>(null);

  // Progress state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form state - Step 1: Basic Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Form state - Step 2 & 3: Phone Verification (split into 2 steps)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Form state - Step 4: Personal Details
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');

  // Form state - Step 5: Bio
  const [bio, setBio] = useState('');

  // Form state - Step 6: Deposit Limits
  const [depositLimitDaily, setDepositLimitDaily] = useState('500');
  const [depositLimitWeekly, setDepositLimitWeekly] = useState('2000');
  const [depositLimitMonthly, setDepositLimitMonthly] = useState('5000');

  // Form state - Step 7: Stake Limit
  const [bettingLimit, setBettingLimit] = useState('100');

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const { createProfile, loading } = useCreateProfile();
  const phoneVerification = usePhoneVerification();

  const handleNext = async () => {
    // Clear errors when moving forward
    setFieldErrors({});

    // Validate current step before proceeding
    if (currentStep === 1) {
      // Step 1: Basic Info
      if (!firstName || !lastName) {
        setFieldErrors({
          firstName: !firstName ? 'First name is required' : undefined,
          lastName: !lastName ? 'Last name is required' : undefined,
        });
        return;
      }
    } else if (currentStep === 2) {
      // Step 2: Phone Number Entry
      if (phoneNumberRef.current) {
        const canProceed = await phoneNumberRef.current.handleNext();
        if (!canProceed) {
          return; // Stay on current step
        }
      }
    } else if (currentStep === 3) {
      // Step 3: Verification Code
      if (verificationCodeRef.current) {
        const canProceed = await verificationCodeRef.current.handleNext();
        if (!canProceed) {
          return; // Stay on current step
        }
        // If canProceed is true, phoneVerified will be set by onVerified callback
      }
    } else if (currentStep === 4) {
      // Step 4: Personal Details
      if (!dateOfBirth || !address1 || !city || !postcode) {
        setFieldErrors({
          address1: !address1 ? 'Address is required' : undefined,
          city: !city ? 'City is required' : undefined,
          postcode: !postcode ? 'Postcode is required' : undefined,
        });
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFieldErrors({});
    }
  };

  const handlePhoneVerified = () => {
    setPhoneVerified(true);
    setVerifiedPhoneNumber(phoneNumber);
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    // If phone number changes and is different from verified number, reset verification
    if (verifiedPhoneNumber && text !== verifiedPhoneNumber) {
      setPhoneVerified(false);
    }
    if (fieldErrors.phoneNumber) {
      setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  const handleSubmit = async () => {
    // Validate using Zod
    const validation = validateWithZod<FieldErrors>(createProfileSchema, {
      firstName,
      lastName,
      phoneNumber,
      bio,
      depositLimitDaily,
      depositLimitWeekly,
      depositLimitMonthly,
      bettingLimit,
    });

    if (!validation.success) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});

    // Create user profile
    // TODO: Add date_of_birth, address fields when backend supports them
    // TODO: Update backend to support daily/weekly/monthly deposit limits
    const success = await createProfile({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      bio: bio || undefined,
      deposit_limit: depositLimitDaily ? parseInt(depositLimitDaily, 10) : undefined,
      betting_limit: bettingLimit ? parseInt(bettingLimit, 10) : undefined,
    });

    if (success) {
      // Navigate to Dashboard after successful profile creation
      navigation.navigate('Dashboard');
    }
  };

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        bottomOffset={10}
      >
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <StepsContainer>
          <AnimatedStepContainer isActive={currentStep === 1}>
            <BasicInfoStep
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={(text) => {
                setFirstName(text);
                if (fieldErrors.firstName) {
                  setFieldErrors((prev) => ({ ...prev, firstName: undefined }));
                }
              }}
              onLastNameChange={(text) => {
                setLastName(text);
                if (fieldErrors.lastName) {
                  setFieldErrors((prev) => ({ ...prev, lastName: undefined }));
                }
              }}
              firstNameError={fieldErrors.firstName}
              lastNameError={fieldErrors.lastName}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 2}>
            <PhoneNumberStep
              ref={phoneNumberRef}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={handlePhoneNumberChange}
              phoneNumberError={fieldErrors.phoneNumber}
              sendVerificationCode={phoneVerification.sendVerificationCode}
              verificationError={phoneVerification.error}
              clearError={phoneVerification.clearError}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 3}>
            <VerificationCodeStep
              ref={verificationCodeRef}
              isVerified={phoneVerified}
              onVerified={handlePhoneVerified}
              verifyCode={phoneVerification.verifyCode}
              verificationError={phoneVerification.error}
              clearError={phoneVerification.clearError}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 4}>
            <PersonalDetailsStep
              dateOfBirth={dateOfBirth}
              onDateOfBirthChange={setDateOfBirth}
              address1={address1}
              address2={address2}
              city={city}
              postcode={postcode}
              onAddress1Change={(text) => {
                setAddress1(text);
                if (fieldErrors.address1) {
                  setFieldErrors((prev) => ({ ...prev, address1: undefined }));
                }
              }}
              onAddress2Change={setAddress2}
              onCityChange={(text) => {
                setCity(text);
                if (fieldErrors.city) {
                  setFieldErrors((prev) => ({ ...prev, city: undefined }));
                }
              }}
              onPostcodeChange={(text) => {
                setPostcode(text);
                if (fieldErrors.postcode) {
                  setFieldErrors((prev) => ({ ...prev, postcode: undefined }));
                }
              }}
              address1Error={fieldErrors.address1}
              cityError={fieldErrors.city}
              postcodeError={fieldErrors.postcode}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 5}>
            <BioStep
              bio={bio}
              onBioChange={(text) => {
                setBio(text);
                if (fieldErrors.bio) {
                  setFieldErrors((prev) => ({ ...prev, bio: undefined }));
                }
              }}
              bioError={fieldErrors.bio}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 6}>
            <DepositLimitStep
              dailyLimit={depositLimitDaily}
              weeklyLimit={depositLimitWeekly}
              monthlyLimit={depositLimitMonthly}
              onDailyLimitChange={(text) => {
                setDepositLimitDaily(text);
                if (fieldErrors.depositLimitDaily) {
                  setFieldErrors((prev) => ({ ...prev, depositLimitDaily: undefined }));
                }
              }}
              onWeeklyLimitChange={(text) => {
                setDepositLimitWeekly(text);
                if (fieldErrors.depositLimitWeekly) {
                  setFieldErrors((prev) => ({ ...prev, depositLimitWeekly: undefined }));
                }
              }}
              onMonthlyLimitChange={(text) => {
                setDepositLimitMonthly(text);
                if (fieldErrors.depositLimitMonthly) {
                  setFieldErrors((prev) => ({ ...prev, depositLimitMonthly: undefined }));
                }
              }}
              dailyLimitError={fieldErrors.depositLimitDaily}
              weeklyLimitError={fieldErrors.depositLimitWeekly}
              monthlyLimitError={fieldErrors.depositLimitMonthly}
            />
          </AnimatedStepContainer>

          <AnimatedStepContainer isActive={currentStep === 7}>
            <StakeLimitStep
              bettingLimit={bettingLimit}
              onBettingLimitChange={(text) => {
                setBettingLimit(text);
                if (fieldErrors.bettingLimit) {
                  setFieldErrors((prev) => ({ ...prev, bettingLimit: undefined }));
                }
              }}
              bettingLimitError={fieldErrors.bettingLimit}
            />
          </AnimatedStepContainer>
        </StepsContainer>
      </KeyboardAwareScrollView>

      <KeyboardStickyView>
        <ButtonGroup>
          {currentStep > 1 && (
            <Button
              variant="primary"
              title="Back"
              onPress={handleBack}
              style={{ flex: 1, marginRight: 8 }}
            />
          )}
          {currentStep < totalSteps ? (
            <Button variant="secondary" title="Next" onPress={handleNext} style={{ flex: 1 }} />
          ) : (
            <Button
              variant="secondary"
              title="Home"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={{ flex: 1 }}
            />
          )}
        </ButtonGroup>
      </KeyboardStickyView>
    </Container>
  );
};
