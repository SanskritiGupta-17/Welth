import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#4A9EFF",
            tabBarInactiveTintColor: "#5C5F68",
            tabBarStyle: {
                backgroundColor: "#FFFFFF",
                borderTopColor: "#E8E6DF",
                paddingTop: 6,
                paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                height: 60 + (insets.bottom > 0 ? insets.bottom : 8),
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />

            <Tabs.Screen
                name="transaction"
                options={{
                    title: 'Transaction',
                    tabBarIcon: ({ color }) => <MaterialIcons name="attach-money" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="add-transaction"
                options={{
                    title: 'Add',
                    tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="assistant"
                options={{
                    title: 'Assistant',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="robot" size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />

        </Tabs>
    );
}
