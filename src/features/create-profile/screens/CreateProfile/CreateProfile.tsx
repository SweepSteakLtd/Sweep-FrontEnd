import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { ProgressIndicator } from '~/components/ProgressIndicator/ProgressIndicator';
import { AnimatedStepContainer } from '~/features/create-profile/components/AnimatedStepContainer/AnimatedStepContainer';
import { BasicInfoStep } from '~/features/create-profile/components/BasicInfoStep/BasicInfoStep';
import { BioStep } from '~/features/create-profile/components/BioStep/BioStep';
import { DepositLimitStep } from '~/features/create-profile/components/DepositLimitStep/DepositLimitStep';
import { PersonalDetailsStep } from '~/features/create-profile/components/PersonalDetailsStep/PersonalDetailsStep';
import { PhoneNumberStep } from '~/features/create-profile/components/PhoneNumberStep/PhoneNumberStep';
import { StakeLimitStep } from '~/features/create-profile/components/StakeLimitStep/StakeLimitStep';
import { VerificationCodeStep } from '~/features/create-profile/components/VerificationCodeStep/VerificationCodeStep';
import { useCreateProfileForm } from '~/features/create-profile/hooks/useCreateProfileForm';
import { ButtonGroup, Container, StepsContainer } from './styles';

export const CreateProfile = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    fieldErrors,
    loading,
    phoneNumberRef,
    verificationCodeRef,
    phoneVerification,
    updateField,
    handleNext,
    handleBack,
    handlePhoneVerified,
    handlePhoneNumberChange,
    handleSubmit,
  } = useCreateProfileForm();

  return (
    <Container>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        bottomOffset={10}
      >
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <StepsContainer>
          {/* Step 1: Basic Info */}
          <AnimatedStepContainer isActive={currentStep === 1}>
            <BasicInfoStep
              firstName={formData.firstName}
              lastName={formData.lastName}
              onFirstNameChange={(text) => updateField('firstName', text)}
              onLastNameChange={(text) => updateField('lastName', text)}
              firstNameError={fieldErrors.firstName}
              lastNameError={fieldErrors.lastName}
            />
          </AnimatedStepContainer>

          {/* Step 2: Phone Number */}
          <AnimatedStepContainer isActive={currentStep === 2}>
            <PhoneNumberStep
              ref={phoneNumberRef}
              phoneNumber={formData.phoneNumber}
              onPhoneNumberChange={handlePhoneNumberChange}
              phoneNumberError={fieldErrors.phoneNumber}
              sendVerificationCode={phoneVerification.sendVerificationCode}
              verificationError={phoneVerification.error}
              clearError={phoneVerification.clearError}
            />
          </AnimatedStepContainer>

          {/* Step 3: Verification Code */}
          <AnimatedStepContainer isActive={currentStep === 3}>
            <VerificationCodeStep
              ref={verificationCodeRef}
              isVerified={formData.phoneVerified}
              onVerified={handlePhoneVerified}
              verifyCode={phoneVerification.verifyCode}
              verificationError={phoneVerification.error}
              clearError={phoneVerification.clearError}
            />
          </AnimatedStepContainer>

          {/* Step 4: Personal Details */}
          <AnimatedStepContainer isActive={currentStep === 4}>
            <PersonalDetailsStep
              dateOfBirth={formData.dateOfBirth}
              onDateOfBirthChange={(date) => updateField('dateOfBirth', date)}
              address1={formData.address1}
              address2={formData.address2}
              city={formData.city}
              postcode={formData.postcode}
              onAddress1Change={(text) => updateField('address1', text)}
              onAddress2Change={(text) => updateField('address2', text)}
              onCityChange={(text) => updateField('city', text)}
              onPostcodeChange={(text) => updateField('postcode', text)}
              address1Error={fieldErrors.address1}
              cityError={fieldErrors.city}
              postcodeError={fieldErrors.postcode}
            />
          </AnimatedStepContainer>

          {/* Step 5: Bio */}
          <AnimatedStepContainer isActive={currentStep === 5}>
            <BioStep
              bio={formData.bio}
              onBioChange={(text) => updateField('bio', text)}
              bioError={fieldErrors.bio}
            />
          </AnimatedStepContainer>

          {/* Step 6: Deposit Limits */}
          <AnimatedStepContainer isActive={currentStep === 6}>
            <DepositLimitStep
              dailyLimit={formData.depositLimitDaily}
              weeklyLimit={formData.depositLimitWeekly}
              monthlyLimit={formData.depositLimitMonthly}
              onDailyLimitChange={(text) => updateField('depositLimitDaily', text)}
              onWeeklyLimitChange={(text) => updateField('depositLimitWeekly', text)}
              onMonthlyLimitChange={(text) => updateField('depositLimitMonthly', text)}
              dailyLimitError={fieldErrors.depositLimitDaily}
              weeklyLimitError={fieldErrors.depositLimitWeekly}
              monthlyLimitError={fieldErrors.depositLimitMonthly}
            />
          </AnimatedStepContainer>

          {/* Step 7: Stake Limit */}
          <AnimatedStepContainer isActive={currentStep === 7}>
            <StakeLimitStep
              bettingLimit={formData.bettingLimit}
              onBettingLimitChange={(text) => updateField('bettingLimit', text)}
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
