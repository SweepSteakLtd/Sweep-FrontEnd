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

  const renderStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <BasicInfoStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            onFirstNameChange={(text) => updateField('firstName', text)}
            onLastNameChange={(text) => updateField('lastName', text)}
            firstNameError={fieldErrors.firstName}
            lastNameError={fieldErrors.lastName}
          />
        );

      case 2:
        return (
          <PhoneNumberStep
            ref={phoneNumberRef}
            phoneNumber={formData.phoneNumber}
            onPhoneNumberChange={handlePhoneNumberChange}
            phoneNumberError={fieldErrors.phoneNumber}
            sendVerificationCode={phoneVerification.sendVerificationCode}
            verificationError={phoneVerification.error}
            clearError={phoneVerification.clearError}
          />
        );

      case 3:
        return (
          <VerificationCodeStep
            ref={verificationCodeRef}
            isVerified={formData.phoneVerified}
            onVerified={handlePhoneVerified}
            verifyCode={phoneVerification.verifyCode}
            verificationError={phoneVerification.error}
            clearError={phoneVerification.clearError}
          />
        );

      case 4:
        return (
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
            dateOfBirthError={fieldErrors.dateOfBirth}
            address1Error={fieldErrors.address1}
            cityError={fieldErrors.city}
            postcodeError={fieldErrors.postcode}
          />
        );

      case 5:
        return (
          <BioStep
            bio={formData.bio}
            onBioChange={(text) => updateField('bio', text)}
            bioError={fieldErrors.bio}
          />
        );

      case 6:
        return (
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
        );

      case 7:
        return (
          <StakeLimitStep
            bettingLimit={formData.bettingLimit}
            onBettingLimitChange={(text) => updateField('bettingLimit', text)}
            bettingLimitError={fieldErrors.bettingLimit}
          />
        );

      default:
        return null;
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
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            return (
              <AnimatedStepContainer key={stepNumber} isActive={currentStep === stepNumber}>
                {renderStep(stepNumber)}
              </AnimatedStepContainer>
            );
          })}
        </StepsContainer>
      </KeyboardAwareScrollView>

      <KeyboardStickyView>
        <ButtonGroup>
          <Button
            variant="primary"
            title="Back"
            onPress={handleBack}
            style={{
              flex: 1,
              marginRight: 8,
              opacity: currentStep === 1 ? 0 : 1,
              pointerEvents: currentStep === 1 ? 'none' : 'auto',
            }}
          />
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
