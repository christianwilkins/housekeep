import { View } from 'react-native';
import { Heading } from "@/components/ui/heading"

export default function HomeDetail() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Heading size='xl'>This is the Home Detail</Heading>
    </View>
  );
}