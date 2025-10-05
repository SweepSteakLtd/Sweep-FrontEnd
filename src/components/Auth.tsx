import { Button, Input } from '@rneui/themed';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactElement, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { firebaseAuth } from '../lib/firebase';
import { createUser } from '../services';
import { useUser } from '../services/user/user';

export default function Auth(): ReactElement {
  const { getUser } = useUser();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
      if (!user) {
        Alert.alert('Failed to create account.');
      }

      const currentToken = await user.getIdToken();

      if (!currentToken) {
        Alert.alert('Authentication failed. Please try again.');
        return;
      }
      getUser();
      localStorage.setItem('access_token', JSON.stringify(currentToken));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[DEBUG]:', error);
      }
      Alert.alert('Error signing in. Please try again.');
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      // request that creates user in database doesnt need to be awaited but can be handled in background while user is going throught rest of the flow
      await createUser({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
      });

      if (!user.emailVerified) Alert.alert('Please check your inbox for email verification!');
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[DEBUG]:', error);
      }
      Alert.alert('Error signing up. Please try again.');
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="First name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text: string) => setFirstName(text)}
          value={firstName}
          placeholder="First name"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Last name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text: string) => setLastName(text)}
          value={lastName}
          placeholder="Last name"
          autoCapitalize={'none'}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Phone number"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={(text: string) => setPhoneNumber(text)}
          value={phoneNumber}
          placeholder="Phone number"
          autoCapitalize={'none'}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </View>
  );
}

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
