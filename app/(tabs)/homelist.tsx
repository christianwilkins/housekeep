// app/(tabs)/homelist.tsx
import { View } from 'react-native';
import { Heading } from "@/components/ui/heading"
import { Link } from "expo-router";

export default function HomeList() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View >
        
        </View>
      <Heading size='xl'>Welcome to HomeList!</Heading>
      <Link href="/homedetail" style={{ fontSize: 18, color: "blue", marginTop: 20 }}>
        Go to Home Details
      </Link>
    </View>
  );
}
