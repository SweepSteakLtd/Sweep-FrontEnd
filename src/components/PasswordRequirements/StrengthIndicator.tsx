import React from 'react';
import { useTheme } from 'styled-components/native';
import {
  BarContainer,
  BarTrack,
  StrengthBar,
  StrengthLabel,
  StrengthRow,
  StrengthSection,
} from './styles';

/**
 * Helper to get password strength level
 * Returns: 'weak', 'medium', 'strong'
 */
export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (!password) return 'weak';

  // Check if all requirements are met
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const allRequirementsMet =
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  // If all requirements are met, it's strong
  if (allRequirementsMet) return 'strong';

  // Count how many requirements are met
  let metRequirements = 0;
  if (hasMinLength) metRequirements++;
  if (hasUppercase) metRequirements++;
  if (hasLowercase) metRequirements++;
  if (hasNumber) metRequirements++;
  if (hasSpecialChar) metRequirements++;

  // Medium if 3 or more requirements are met
  if (metRequirements >= 3) return 'medium';

  return 'weak';
};

interface StrengthIndicatorProps {
  password: string;
}

export const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ password }) => {
  const theme = useTheme();

  if (!password) return null;

  const strength = getPasswordStrength(password);

  const getStrengthColor = () => {
    switch (strength) {
      case 'weak':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'strong':
        return theme.colors.success;
      default:
        return theme.colors.text.tertiary;
    }
  };

  const getStrengthWidth = () => {
    switch (strength) {
      case 'weak':
        return '33%';
      case 'medium':
        return '66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  const getStrengthLabel = () => {
    switch (strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <StrengthSection>
      <StrengthRow>
        <BarContainer>
          <BarTrack>
            <StrengthBar
              style={{
                width: getStrengthWidth(),
                backgroundColor: getStrengthColor(),
              }}
            />
          </BarTrack>
        </BarContainer>
        <StrengthLabel style={{ color: getStrengthColor() }}>{getStrengthLabel()}</StrengthLabel>
      </StrengthRow>
    </StrengthSection>
  );
};
