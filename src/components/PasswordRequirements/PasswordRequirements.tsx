import React from 'react';
import { StrengthIndicator } from './StrengthIndicator';
import { CheckIcon, Container, RequirementItem, RequirementText } from './styles';

interface PasswordRequirementsProps {
  password: string;
  show?: boolean;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  show = true,
}) => {
  if (!show) return null;

  const requirements = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      label: 'One uppercase letter',
      met: /[A-Z]/.test(password),
    },
    {
      label: 'One lowercase letter',
      met: /[a-z]/.test(password),
    },
    {
      label: 'One number',
      met: /[0-9]/.test(password),
    },
    {
      label: 'One special character (!@#$%^&*)',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <Container>
      <StrengthIndicator password={password} />

      {requirements.map((req, index) => (
        <RequirementItem key={index}>
          <CheckIcon met={req.met}>{req.met ? '✓' : '○'}</CheckIcon>
          <RequirementText met={req.met}>{req.label}</RequirementText>
        </RequirementItem>
      ))}
    </Container>
  );
};
