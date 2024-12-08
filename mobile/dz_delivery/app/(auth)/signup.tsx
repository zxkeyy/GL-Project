import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Link } from "expo-router";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    // Here you would typically integrate with your authentication service
    Alert.alert(
      "Sign Up",
      `Attempted to sign up with full name: ${fullName} email: ${email} and password: ${password}`
    );
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setFullName}
          value={fullName}
          placeholder="Full Name"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setRePassword}
          value={rePassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={signUpWithEmail}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Already have an account??? </Text>
        <Link href="/login">Log in</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
