import { Text } from "@react-navigation/elements";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
    return (
        <SafeAreaView className="flex-1 bg-brand-body" edges={["top"]}>
            <Text>Onboarding</Text>
        </SafeAreaView>
    )
}