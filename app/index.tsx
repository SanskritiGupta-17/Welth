import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { Redirect } from "expo-router";
import { useAuth } from '@clerk/expo'

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return (
      <Redirect href="/(root)/(tabs)" />
    )
  }

  return (
    <Redirect href="../(auth)/sign-in" />
  );
}
