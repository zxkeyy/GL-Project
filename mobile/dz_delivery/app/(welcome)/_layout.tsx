import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function WelcomeLayout() {
    return (
        <GestureHandlerRootView>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
        </GestureHandlerRootView>
    );
}
