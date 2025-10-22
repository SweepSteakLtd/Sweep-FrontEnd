import { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import { Container, Tab, TabText } from './styles';

export interface TabItem {
  id: string;
  label: string;
}

export type TabBarVariant = 'default' | 'segmented';

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  variant?: TabBarVariant;
}

export const TabBar = ({ tabs, activeTab, onTabPress, variant = 'default' }: TabBarProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View | null }>({});

  useEffect(() => {
    // Animate scale when tab changes (only for default variant)
    if (variant === 'default') {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Auto-scroll to selected tab for segmented variant
    if (variant === 'segmented' && tabRefs.current[activeTab]) {
      tabRefs.current[activeTab]?.measureLayout(
        scrollViewRef.current as any,
        (x, _y, _width) => {
          scrollViewRef.current?.scrollTo({
            x: Math.max(0, x - 20), // Add some padding
            animated: true,
          });
        },
        () => {},
      );
    }
  }, [activeTab, scaleAnim, variant]);

  return (
    <Container variant={variant}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: variant === 'segmented' ? 0 : 20,
          paddingVertical: variant === 'segmented' ? 0 : 12,
          flexGrow: 1,
          justifyContent: variant === 'default' ? 'center' : 'flex-start',
          gap: variant === 'default' ? 12 : 0,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const isLast = index === tabs.length - 1;
          return (
            <Animated.View
              key={tab.id}
              ref={(ref) => {
                tabRefs.current[tab.id] = ref as View | null;
              }}
              style={{
                transform: [{ scale: isActive && variant === 'default' ? scaleAnim : 1 }],
                flex: 1,
              }}
            >
              <Tab
                active={isActive}
                variant={variant}
                isLast={isLast}
                onPress={() => onTabPress(tab.id)}
                activeOpacity={0.7}
              >
                <TabText active={isActive} variant={variant}>
                  {tab.label}
                </TabText>
              </Tab>
            </Animated.View>
          );
        })}
      </ScrollView>
    </Container>
  );
};
