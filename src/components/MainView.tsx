import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { firebaseAuth } from '../lib/firebase';
import { useUser } from '../services/user/user';
import Auth from './Auth';

export const MainView = () => {
  const { user, updateUser, getUser } = useUser();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((firebaseUser) => {
      firebaseUser?.getIdToken().then(() => {
        if (!user) {
          getUser();
        }
      });
    });
  }, []);

  const logOutUser = () => {
    signOut(firebaseAuth);
    localStorage.removeItem('access_token');
    updateUser(null);
  };

  return user ? (
    <View>
      <Text>Main View - User is logged in</Text>
      <Text>
        {user.first_name} {user.last_name}
      </Text>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Log out" onPress={() => logOutUser()} />
      </View>
    </View>
  ) : (
    <Auth />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
