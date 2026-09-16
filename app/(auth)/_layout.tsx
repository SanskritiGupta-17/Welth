import { Stack } from "expo-router";
import React from "react";
import { useAuth } from '@clerk/expo'
import { Redirect } from "expo-router"

export default function AuthLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return (
            <Redirect href="/" />
        )
    }
    return (
        <>
            <Stack
                screenOptions={{ headerShown: false }}
            >
            </Stack>
        </>
    )
}