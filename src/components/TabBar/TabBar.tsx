import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Skeleton } from '~/components/Skeleton/Skeleton';
import { Container, Tab, TabText } from './styles';

export interface TabItem {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  loading?: boolean;
}

export const TabBar = ({ tabs, activeTab, onTabPress, loading = false }: TabBarProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const tabRefs = useRef<{ [key: string]: View | null }>({});

  useEffect(() => {
    // Auto-scroll to selected tab
    if (tabRefs.current[activeTab]) {
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
  }, [activeTab]);

  if (loading) {
    return (
      <Container>
        <Skeleton.Item flexDirection="row" paddingHorizontal={4} gap={4}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} width={100} height={40} borderRadius={8} />
          ))}
        </Skeleton.Item>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          flexGrow: 1,
          justifyContent: 'flex-start',
          gap: 0,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const isLast = index === tabs.length - 1;
          return (
            <View
              key={tab.id}
              ref={(ref) => {
                tabRefs.current[tab.id] = ref as View | null;
              }}
              style={{ flex: 1 }}
            >
              <Tab
                active={isActive}
                isLast={isLast}
                onPress={() => onTabPress(tab.id)}
                activeOpacity={0.7}
              >
                <TabText active={isActive}>{tab.label}</TabText>
              </Tab>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};
