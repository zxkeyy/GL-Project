import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => {
  const handleLogin = () => {
    // Navigate to Login screen
    navigation.navigate("Login");
  };

  const handleSignUp = () => {
    // Navigate to SignUp screen (to be implemented)
    console.log("Navigate to Sign Up screen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/logo.svg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to FreelanceDelivery</Text>
        <Text style={styles.subtitle}>
          Your partner in efficient deliveries
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Feather name="log-in" size={24} color="#FEFF9F" />
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={handleSignUp}>
            <Feather name="user-plus" size={24} color="#72BF78" />
            <Text style={[styles.buttonText, styles.signUpButtonText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing, you agree to our</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.link}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}> and </Text>
          <TouchableOpacity>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFF9F",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#72BF78",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#A0D683",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72BF78",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FEFF9F",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: "#D3EE98",
    borderWidth: 2,
    borderColor: "#72BF78",
  },
  signUpButtonText: {
    color: "#72BF78",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    color: "#72BF78",
    fontSize: 14,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  link: {
    color: "#72BF78",
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default WelcomeScreen;
