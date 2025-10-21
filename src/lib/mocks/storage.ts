import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MockConfig } from './types';

const MOCK_CONFIG_KEY = '@sweepsteak:mock_config';

/**
 * Get the current mock configuration
 */
export const getMockConfig = async (): Promise<MockConfig> => {
  try {
    const stored = await AsyncStorage.getItem(MOCK_CONFIG_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[MockStorage]: Error loading mock config:', error);
  }

  // Return default config
  return {
    globalEnabled: false,
    globalDelay: null,
    handlers: {},
  };
};

/**
 * Save mock configuration
 */
export const saveMockConfig = async (config: MockConfig): Promise<void> => {
  try {
    await AsyncStorage.setItem(MOCK_CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('[MockStorage]: Error saving mock config:', error);
  }
};

/**
 * Toggle global mock enabled state
 */
export const toggleGlobalMock = async (enabled: boolean): Promise<void> => {
  const config = await getMockConfig();
  config.globalEnabled = enabled;
  await saveMockConfig(config);
};

/**
 * Toggle individual mock handler
 */
export const toggleMockHandler = async (
  handlerId: string,
  enabled: boolean
): Promise<void> => {
  const config = await getMockConfig();
  if (!config.handlers[handlerId]) {
    config.handlers[handlerId] = { enabled: false, selectedScenario: '', delay: null };
  }
  config.handlers[handlerId].enabled = enabled;
  await saveMockConfig(config);
};

/**
 * Select a scenario for a mock handler
 */
export const selectMockScenario = async (
  handlerId: string,
  scenario: string
): Promise<void> => {
  const config = await getMockConfig();
  if (!config.handlers[handlerId]) {
    config.handlers[handlerId] = { enabled: false, selectedScenario: '', delay: null };
  }
  config.handlers[handlerId].selectedScenario = scenario;
  await saveMockConfig(config);
};

/**
 * Set global delay (overrides all delays)
 */
export const setGlobalDelay = async (delay: number | null): Promise<void> => {
  const config = await getMockConfig();
  config.globalDelay = delay;
  await saveMockConfig(config);
};

/**
 * Set delay for a specific handler (overrides scenario delays for that handler)
 */
export const setHandlerDelay = async (
  handlerId: string,
  delay: number | null
): Promise<void> => {
  const config = await getMockConfig();
  if (!config.handlers[handlerId]) {
    config.handlers[handlerId] = { enabled: false, selectedScenario: '', delay: null };
  }
  config.handlers[handlerId].delay = delay;
  await saveMockConfig(config);
};
