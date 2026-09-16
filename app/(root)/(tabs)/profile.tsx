import { Alert, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function Profile() {
    const { user } = useUser();
    const { signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = () => {
        Alert.alert("Sign Out", "Are You sure you want to sign out?", [
            { text: "Cancle", style: "cancel" },
            {
                text: "Sign out",
                style: "destructive",
                onPress: async () => {
                    await signOut()
                    router.replace('/(auth)/sign-in')
                },
            },
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-brand-body" edges={["top"]}>
            <TouchableOpacity>
                <Text onPress={handleSignOut}>Log Out</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}