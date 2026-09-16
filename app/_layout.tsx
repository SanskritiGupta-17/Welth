import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { tokenCache } from '@clerk/expo/token-cache'
import { ClerkProvider } from '@clerk/expo'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export default function RootLayout() {
  return (
    <>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <StatusBar style="dark" backgroundColor="#0303039f" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Home" }}
          />
        </Stack>
      </ClerkProvider>
    </>
  );
}
