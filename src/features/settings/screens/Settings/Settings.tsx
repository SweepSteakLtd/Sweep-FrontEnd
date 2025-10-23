import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Switch } from '~/components/Switch/Switch';
import { mockHandlers } from '~/lib/mocks/handlers/registry';
import { refreshMockConfig } from '~/lib/mocks/interceptor';
import {
  getMockConfig,
  selectMockScenario,
  setHandlerDelay,
  toggleGlobalMock,
  toggleMockHandler,
} from '~/lib/mocks/storage';
import type { MockConfig, MockHandler } from '~/lib/mocks/types';
import type { RootStackParamList } from '~/navigation/types';
import {
  BottomSheetContainer,
  BottomSheetTitle,
  CheckIcon,
  Container,
  DelayButton,
  DelayButtonsRow,
  DelayButtonText,
  DelayLabel,
  DelaySection,
  EmptyState,
  EmptyStateText,
  GroupChevron,
  GroupContainer,
  GroupHeader,
  GroupHeaderContainer,
  GroupSummary,
  HandlerCard,
  HandlerHeader,
  HandlerInfo,
  HandlerMeta,
  HandlerMethod,
  HandlerName,
  HandlerUrl,
  ScenarioOption,
  ScenarioText,
  ScrollContent,
  Section,
  SelectedScenario,
  ToggleLabel,
  ToggleRow,
} from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HandlerWithConfig extends MockHandler {
  configEnabled: boolean;
  configSelectedScenario: string;
}

export const Settings = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<MockConfig | null>(null);
  const [handlers, setHandlers] = useState<HandlerWithConfig[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    User: true,
    Tournament: true,
    Game: true,
    Bet: true,
  });

  // Bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedHandler, setSelectedHandler] = useState<HandlerWithConfig | null>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    [],
  );

  // Configure navigation header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Mock APIs',
    });
  }, [navigation]);

  // Load mock configuration
  const loadConfig = async () => {
    setLoading(true);
    const mockConfig = await getMockConfig();
    setConfig(mockConfig);

    // Merge handlers with config
    const handlersWithConfig: HandlerWithConfig[] = mockHandlers.map((handler) => ({
      ...handler,
      configEnabled: mockConfig.handlers[handler.id]?.enabled ?? false,
      configSelectedScenario:
        mockConfig.handlers[handler.id]?.selectedScenario || handler.defaultScenario,
    }));

    setHandlers(handlersWithConfig);
    setLoading(false);
  };

  // Group handlers by their group property
  const groupedHandlers = useMemo(() => {
    const groups: Record<string, HandlerWithConfig[]> = {};
    handlers.forEach((handler) => {
      if (!groups[handler.group]) {
        groups[handler.group] = [];
      }
      groups[handler.group].push(handler);
    });
    return groups;
  }, [handlers]);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleGlobalToggle = async (value: boolean) => {
    if (!config) return;

    await toggleGlobalMock(value);
    await refreshMockConfig();
    setConfig({ ...config, globalEnabled: value });
  };

  const handleHandlerToggle = async (handlerId: string, value: boolean) => {
    if (!config) return;

    await toggleMockHandler(handlerId, value);
    await refreshMockConfig();

    // Update local state
    setHandlers((prev) =>
      prev.map((h) => (h.id === handlerId ? { ...h, configEnabled: value } : h)),
    );

    setConfig({
      ...config,
      handlers: {
        ...config.handlers,
        [handlerId]: {
          ...config.handlers[handlerId],
          enabled: value,
        },
      },
    });
  };

  const handleScenarioSelect = async (scenario: string) => {
    if (!config || !selectedHandler) return;

    await selectMockScenario(selectedHandler.id, scenario);
    await refreshMockConfig();

    // Update local state
    setHandlers((prev) =>
      prev.map((h) =>
        h.id === selectedHandler.id ? { ...h, configSelectedScenario: scenario } : h,
      ),
    );

    setConfig({
      ...config,
      handlers: {
        ...config.handlers,
        [selectedHandler.id]: {
          ...config.handlers[selectedHandler.id],
          selectedScenario: scenario,
        },
      },
    });

    // Close bottom sheet
    bottomSheetRef.current?.close();
  };

  const handleDelaySelect = async (delay: number | null) => {
    if (!config || !selectedHandler) return;

    await setHandlerDelay(selectedHandler.id, delay);
    await refreshMockConfig();

    // Update local state
    setConfig({
      ...config,
      handlers: {
        ...config.handlers,
        [selectedHandler.id]: {
          ...config.handlers[selectedHandler.id],
          delay,
        },
      },
    });
  };

  const DELAY_OPTIONS = [
    { label: '0s', value: 0 },
    { label: '3s', value: 3000 },
    { label: '5s', value: 5000 },
    { label: '10s', value: 10000 },
  ];

  const openScenarioSheet = (handler: HandlerWithConfig) => {
    if (!config?.globalEnabled) {
      console.log('[Settings]: Not opening sheet - global mocks disabled');
      return;
    }

    console.log('[Settings]: Setting selected handler and expanding sheet');
    setSelectedHandler(handler);
    bottomSheetRef.current?.expand();
  };

  const renderHandler = (handler: HandlerWithConfig) => {
    const isDisabled = !config?.globalEnabled;
    const handlerDelay = config?.handlers[handler.id]?.delay;
    const delayText =
      handlerDelay !== null && handlerDelay !== undefined ? `${handlerDelay / 1000}s` : null;

    return (
      <HandlerCard
        key={handler.id}
        disabled={isDisabled}
        onPress={() => !isDisabled && openScenarioSheet(handler)}
        activeOpacity={0.7}
      >
        <HandlerHeader>
          <HandlerInfo>
            <HandlerName>{handler.name}</HandlerName>
            <HandlerMeta>
              <HandlerMethod method={handler.method}>{handler.method}</HandlerMethod>
              <HandlerUrl numberOfLines={1}>{handler.urlPattern}</HandlerUrl>
            </HandlerMeta>
            {handler.configEnabled && config?.globalEnabled && (
              <SelectedScenario>
                → {handler.configSelectedScenario}
                {delayText && ` • ${delayText}`}
              </SelectedScenario>
            )}
          </HandlerInfo>
          <Switch
            value={handler.configEnabled}
            onValueChange={(value) => handleHandlerToggle(handler.id, value)}
            disabled={isDisabled}
          />
        </HandlerHeader>
      </HandlerCard>
    );
  };

  if (loading) {
    return (
      <Container>
        <EmptyState>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </EmptyState>
      </Container>
    );
  }

  if (!config) {
    return (
      <Container>
        <EmptyState>
          <EmptyStateText>Failed to load mock configuration</EmptyStateText>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContent>
        <Section>
          <ToggleRow>
            <ToggleLabel>Enable Mock APIs</ToggleLabel>
            <Switch value={config.globalEnabled} onValueChange={handleGlobalToggle} />
          </ToggleRow>

          {handlers.length === 0 ? (
            <EmptyStateText>No mock handlers configured</EmptyStateText>
          ) : (
            Object.entries(groupedHandlers).map(([group, groupHandlers]) => {
              const isExpanded = expandedGroups[group] ?? false;
              const enabledHandlers = groupHandlers.filter((h) => h.configEnabled);
              const enabledCount = enabledHandlers.length;
              const totalCount = groupHandlers.length;

              return (
                <GroupContainer key={group} expanded={isExpanded}>
                  <GroupHeaderContainer onPress={() => toggleGroup(group)} activeOpacity={0.7}>
                    <GroupHeader>{group}</GroupHeader>
                    <GroupChevron expanded={isExpanded}>▶</GroupChevron>
                  </GroupHeaderContainer>
                  {!isExpanded && enabledCount > 0 && (
                    <GroupSummary>
                      {enabledCount} of {totalCount} enabled
                    </GroupSummary>
                  )}
                  {isExpanded && groupHandlers.map(renderHandler)}
                </GroupContainer>
              );
            })
          )}
        </Section>
      </ScrollContent>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView>
          <BottomSheetContainer>
            <BottomSheetTitle>
              {selectedHandler ? `${selectedHandler.name}` : 'Select Scenario'}
            </BottomSheetTitle>

            {selectedHandler && (
              <>
                <DelaySection>
                  <DelayLabel>Response Delay</DelayLabel>
                  <DelayButtonsRow>
                    {DELAY_OPTIONS.map((option) => {
                      const currentDelay = config?.handlers[selectedHandler.id]?.delay;
                      const isSelected = currentDelay === option.value;
                      return (
                        <DelayButton
                          key={option.label}
                          selected={isSelected}
                          onPress={() => handleDelaySelect(option.value)}
                        >
                          <DelayButtonText selected={isSelected}>{option.label}</DelayButtonText>
                        </DelayButton>
                      );
                    })}
                  </DelayButtonsRow>
                </DelaySection>

                <DelayLabel>Scenarios</DelayLabel>
                {Object.keys(selectedHandler.scenarios).map((scenarioName) => (
                  <ScenarioOption
                    key={scenarioName}
                    selected={scenarioName === selectedHandler.configSelectedScenario}
                    onPress={() => handleScenarioSelect(scenarioName)}
                  >
                    <ScenarioText
                      selected={scenarioName === selectedHandler.configSelectedScenario}
                    >
                      {scenarioName}
                    </ScenarioText>
                    {scenarioName === selectedHandler.configSelectedScenario && (
                      <CheckIcon>✓</CheckIcon>
                    )}
                  </ScenarioOption>
                ))}
              </>
            )}
          </BottomSheetContainer>
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
};
