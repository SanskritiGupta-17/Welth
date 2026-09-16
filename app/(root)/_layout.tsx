import { Slot } from "expo-router";
import React from "react";
import { useAuth } from '@clerk/expo'
import { Redirect } from "expo-router"

export default function RootLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return (
            <Redirect href="../(auth)/sign-in" />
        )
    }
    return (
        <Slot />
    )
}