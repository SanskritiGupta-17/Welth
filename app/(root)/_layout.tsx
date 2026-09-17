import { Slot, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuth } from '@clerk/expo'
import { Redirect } from "expo-router"
import { useUserStore } from "@/store/userStore";
import { useUserSync } from "@/hooks/useUserSync";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const needsOnboarding = useUserStore((state) => state.needsOnboarding);
    const pathname = usePathname();
    const [minLoadDone, setMinLoadDone] = useState(false);

    useUserSync()

    useEffect(() => {
        const t = setTimeout(() => setMinLoadDone(true), 1500);
        return () => clearTimeout(t);
    }, []);

    if (!isLoaded) return null
    if (!isSignedIn) {
        return (
            <Redirect href="../(auth)/sign-in" />
        )
    }

    if (!minLoadDone || needsOnboarding === null) {
        return (
            <View className="flex-1 bg-brand-body items-center justify-center">
                <ActivityIndicator size="large" color="#1A1D26" />
            </View>
        )
    }

    if (needsOnboarding && pathname !== "/onboarding") {
        return <Redirect href="/(root)/onboarding" />
    }
    return (
        <Slot />
    )
}