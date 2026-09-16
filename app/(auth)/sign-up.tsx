import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignUpFormSchema, signUpSchema, codeSchema, CodeFormSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, Image, Text, KeyboardAvoidingView, TextInput, Platform, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";

export default function SignUp() {

    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const isLoading = fetchStatus === "fetching"

    const [email, setEmail] = useState("");

    const { control, handleSubmit, formState: { errors: formErrors } } = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        }
    });

    const {
        control: codeControl,
        handleSubmit: handleCodeSubmit,
        formState: { errors: codeErrors },
    } = useForm<{ code: string }>({
        resolver: zodResolver(codeSchema),
        mode: "onBlur",
        defaultValues: {
            code: "",
        }
    });

    const onSignUpPress = async (values: SignUpFormSchema) => {
        setEmail(values.email)

        const { error } = await signUp.password({
            emailAddress: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
        });

        if (error) {
            console.error(JSON.stringify(error, null, 2));
            return;
        }

        if (!error) await signUp.verifications.sendEmailCode();
    };

    const onVerifyPress = async ({ code }: { code: string }) => {
        await signUp.verifications.verifyEmailCode({ code });

        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ session, decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any);
                }
            })
        } else {
            console.error("Sign-up attempt not complete:", signUp);
        }

    };

    if (signUp.status === "complete" || isSignedIn) {
        return null;
    }

    if (
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
    ) {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                className="flex-1 bg-brand-body"
            >

                <View className="flex-1 justify-center px-6 py-10">
                    <Image
                        source={require("../../assets/images/welth.png")}
                        className="w-36 h-16 mb-8"
                        resizeMode="contain"
                    />

                    <Text className="text-3xl font-bold text=[#1A1D26] mb-2 leading-tight">
                        Verify you account
                    </Text>
                    <Text className="text-brand-text-muted text-baxe mb-8">We sent a code to {email}</Text>

                    <Controller
                        control={codeControl}
                        name="code"
                        render={({ field: { value, onChange } }) => {
                            return (
                                <TextInput
                                    className="border-[#E8E6DF] bg-white rounded-xl px-4 py-3 mb-3 text-[#1A1D26]"
                                    placeholder="Enter Verification Code"
                                    placeholderTextColor="#8A8D96"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            );
                        }}
                    />
                    {codeErrors.code && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {codeErrors.code.message}
                        </Text>
                    )}

                    {errors.fields.code && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {errors.fields.code.message}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleCodeSubmit(onVerifyPress)}
                        disabled={isLoading}
                        className="w-full bg-brand-blue py-3 rounded-xl items-center mt-4 mb-4">
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-semibold text-base">Verify</Text>
                        )}
                    </TouchableOpacity>

                    <View className="flex-row items-center justify-center mb-5">
                        <Text className="text-brand-text-muted text-sm">
                            Didn't receive the code?{" "}
                        </Text>

                        <TouchableOpacity
                            onPress={() => signUp.verifications.sendEmailCode()}
                            className="py-2">
                            <Text className="text-brand-blue text-sm">Resend Code</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => signUp.reset()}
                        className="py-2">
                        <Text className="text-brand-blue text-sm"> ← Back to Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            className="flex-1 bg-brand-body"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingVertical: 20 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="px-6 py-10">
                    <Image
                        source={require("../../assets/images/welth.png")}
                        className="w-36 h-16 mb-8"
                        resizeMode="contain"
                    />

                    <Text className="text-3xl font-bold text-[#1A1D26] mb-2 leading-tight">Create Account</Text>
                    <Text className="text-brand-text-muted text-base mb-8">Track your money, powered by AI</Text>

                    <View className="flex-row gap-3 mb-3">
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <TextInput
                                        className="flex-1 border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-[#1A1D26]"
                                        placeholder="First Name"
                                        placeholderTextColor="#8A8D96"
                                        value={value}
                                        onChangeText={onChange}
                                        autoCapitalize="words"
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={control}
                            name="lastName"
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <TextInput
                                        className="flex-1 border-[#E8E6DF] bg-white rounded-xl px-4 py-3 text-[#1A1D26]"
                                        placeholder="Last Name"
                                        placeholderTextColor="#8A8D96"
                                        value={value}
                                        onChangeText={onChange}
                                        autoCapitalize="words"
                                    />
                                );
                            }}
                        />

                    </View>

                    {(formErrors.firstName || formErrors.lastName) && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {formErrors.firstName?.message || formErrors.lastName?.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => {
                            return (
                                <TextInput
                                    className="border-[#E8E6DF] bg-white rounded-xl px-4 py-3 mb-3 text-[#1A1D26]"
                                    placeholder="Email Address"
                                    placeholderTextColor="#8A8D96"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                />
                            );
                        }}
                    />
                    {(formErrors.email) && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {formErrors.email?.message}
                        </Text>
                    )}

                    {errors.fields.emailAddress && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {errors.fields.emailAddress.message}
                        </Text>
                    )}

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { value, onChange } }) => {
                            return (
                                <TextInput
                                    className="border-[#E8E6DF] bg-white rounded-xl px-4 py-3 mb-3 text-[#1A1D26]"
                                    placeholder="Password"
                                    placeholderTextColor="#8A8D96"
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    secureTextEntry
                                />
                            );
                        }}
                    />
                    {(formErrors.password) && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {formErrors.password?.message}
                        </Text>
                    )}

                    {errors.fields.password && (
                        <Text className="text-brand-coral mb-4 text-sm">
                            {errors.fields.password.message}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleSubmit(onSignUpPress)}
                        disabled={isLoading}
                        className="w-full bg-brand-blue py-5 rounded-xl items-center mb-4">
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-semibold text-base">Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <View className="flex-row justify-center gap-2">
                        <Text className="text-brand-text-muted">
                            Already have an account?{" "}
                        </Text>
                        <Link href="/sign-in">
                            <Text className="text-brand-blue font-semibold">Sign In</Text>
                        </Link>
                    </View>

                    {/* Required by clerk for bot protection*/}
                    <View nativeID="clerk-captcha" className="" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
