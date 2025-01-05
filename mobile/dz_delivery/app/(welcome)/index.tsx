import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Welcome1() {
    const router = useRouter();
    const translateX = useSharedValue(0);

    const navigateToNext = () => {
        router.push("/(welcome)/welcome-2");
    };

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0) {
                translateX.value = event.translationX;
            }
        })
        .onEnd(() => {
            if (translateX.value < -width * 0.3) {
                runOnJS(navigateToNext)();
            } else {
                translateX.value = withSpring(0, {
                    damping: 20,
                    stiffness: 90,
                });
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.content, animatedStyle]}>
                    <View style={styles.backgroundIcons}>
                        {[...Array(6)].map((_, i) => (
                            <Image
                                key={i}
                                source={require("@/assets/images/welcome1.png")}
                                style={[
                                    styles.iconBackground,
                                    {
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                    },
                                ]}
                            />
                        ))}
                    </View>
                    <View style={styles.mainContent}>
                        <Image
                            source={require("@/assets/images/welcome1.png")}
                            style={styles.illustration}
                        />
                        <Text style={styles.title}>
                            Seize your{"\n"}opportunities{"\n"}with{" "}
                            <Text style={styles.highlight}>Blitz</Text>
                        </Text>
                        <Text style={styles.subtitle}>
                            With our user-friendly Delivery app,{"\n"}
                            You will enjoy delivering and earning much
                            opportunities
                        </Text>
                    </View>
                </Animated.View>
            </GestureDetector>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.skipButton}
                    // onPress={() => router.replace("/(auth)/auth")}
                >
                    <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={navigateToNext}
                >
                    <Text style={styles.startButtonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF9C4",
    },
    content: {
        flex: 1,
    },
    backgroundIcons: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    iconBackground: {
        width: 24,
        height: 24,
        position: "absolute",
        opacity: 0.2,
    },
    mainContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    illustration: {
        width: width * 0.8,
        height: width * 0.8,
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
        fontFamily: "Sora",
        color: "#000",
    },
    highlight: {
        color: "#4CAF50",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        color: "#666",
        fontFamily: "Sora",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 24,
        paddingBottom: 48,
    },
    skipButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#000",
    },
    skipButtonText: {
        fontSize: 16,
        color: "#000",
        fontFamily: "Sora",
    },
    startButton: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    startButtonText: {
        fontSize: 16,
        color: "#FFF",
        fontFamily: "Sora",
    },
});
