// app/(tabs)/homelist.tsx
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Welcome to HomeList!</ThemedText>
    </View>
  );
}
