import { useState } from 'react';
import { useAlert } from '~/components/Alert/Alert';
import { useGetUser } from '~/services/apis/User/useGetUser';
import { useUpdateUser } from '~/services/apis/User/useUpdateUser';
import { poundsToPence } from '~/utils/currency';

type LimitType = 'monthly' | 'weekly' | 'daily';

type LimitState = {
  value: string;
  noLimit: boolean;
};

type DepositLimitsState = Record<LimitType, LimitState>;

type LimitConfig = {
  id: LimitType;
  title: string;
  currentLimit?: number;
};

const LIMIT_CONFIGS: LimitConfig[] = [
  { id: 'monthly', title: 'Monthly Limit' },
  { id: 'weekly', title: 'Weekly Limit' },
  { id: 'daily', title: 'Daily Limit' },
];

export const useDepositLimits = () => {
  const { data: user } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { showAlert } = useAlert();

  const [limits, setLimits] = useState<DepositLimitsState>({
    monthly: { value: '', noLimit: false },
    weekly: { value: '', noLimit: false },
    daily: { value: '', noLimit: false },
  });

  const updateLimit = (type: LimitType, value: string) => {
    setLimits((prev) => ({
      ...prev,
      [type]: { ...prev[type], value },
    }));
  };

  const toggleNoLimit = (type: LimitType) => {
    setLimits((prev) => ({
      ...prev,
      [type]: {
        value: !prev[type].noLimit ? '' : prev[type].value,
        noLimit: !prev[type].noLimit,
      },
    }));
  };

  const resetLimits = () => {
    setLimits({
      monthly: { value: '', noLimit: false },
      weekly: { value: '', noLimit: false },
      daily: { value: '', noLimit: false },
    });
  };

  const handleUpdate = () => {
    const depositLimit: {
      daily?: number;
      weekly?: number;
      monthly?: number;
    } = {};

    // Build deposit_limit object from state
    (Object.keys(limits) as LimitType[]).forEach((type) => {
      const limit = limits[type];
      if (!limit.noLimit && limit.value) {
        depositLimit[type] = poundsToPence(limit.value);
      }
    });

    // Check if user made any changes
    const hasChanges =
      Object.keys(depositLimit).length > 0 || Object.values(limits).some((limit) => limit.noLimit);

    if (!hasChanges) {
      showAlert({
        title: 'No Changes',
        message: 'Please enter new limits or select "No Limit" options.',
      });
      return;
    }

    updateUser(
      { deposit_limit: depositLimit },
      {
        onSuccess: () => {
          showAlert({
            title: 'Success',
            message: 'Deposit limits updated successfully',
          });
          resetLimits();
        },
        onError: (error) => {
          showAlert({
            title: 'Error',
            message: 'Failed to update deposit limits. Please try again.',
          });
          console.error('Update deposit limits error:', error);
        },
      },
    );
  };

  const depositLimits: (LimitConfig & LimitState)[] = LIMIT_CONFIGS.map((config) => ({
    ...config,
    ...limits[config.id],
    currentLimit: user?.deposit_limit?.[config.id],
  }));

  return {
    limits,
    depositLimits,
    updateLimit,
    toggleNoLimit,
    resetLimits,
    handleUpdate,
    isPending,
  };
};
