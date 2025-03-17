import { View } from 'react-native';
import { Heading } from "@/components/ui/heading"
import { Link } from "expo-router";

export default function HomeDetail() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Heading size='xl'>This is the Home Detail</Heading>
      <Link href="/taskdetail" style={{ fontSize: 18, color: "blue", marginTop: 20 }}>
        Go to Task Details
      </Link>
    </View>
  );
}