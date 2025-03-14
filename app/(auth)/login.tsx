import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Link } from 'expo-router';
import { useAuth } from '@/app/context/auth';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <VStack space="md" style={{ width: '100%', maxWidth: 400 }}>
        <ThemedText type="title" style={styles.title}>Login</ThemedText>
        
        <FormControl>
          <FormControlLabel>Email</FormControlLabel>
          <Input>
            <InputField
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCapitalize="none"
            />
          </Input>
        </FormControl>
        
        <FormControl>
          <FormControlLabel>Password</FormControlLabel>
          <Input>
            <InputField
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
            />
          </Input>
        </FormControl>
        
        {error ? <Text className="text-error-700">{error}</Text> : null}
        
        <Button onPress={handleSignIn} isDisabled={loading}>
          {loading ? (
            <ButtonText>Signing in...</ButtonText>
          ) : (
            <ButtonText>Sign In</ButtonText>
          )}
        </Button>
        
        <HStack style={{ justifyContent: 'center' }}>
          <ThemedText>Don't have an account? </ThemedText>
          <Link href="/(auth)/register">
            <ThemedText type="link">Sign up</ThemedText>
          </Link>
        </HStack>
      </VStack>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
}); 