import { View } from 'react-native';
import 'react-native-url-polyfill/auto';
import { MainView } from './src/components/MainView';
import { UserProvider } from './src/services/user/user';

export default function App() {
  return (
    <View>
      <UserProvider>
        <MainView />
      </UserProvider>
    </View>
  );
}
