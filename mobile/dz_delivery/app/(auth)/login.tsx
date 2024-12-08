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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginWithEmail() {
    setLoading(true);
    // Here you would typically integrate with your authentication service
    Alert.alert("Login", `Attempted to login with email: ${email}`);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={loginWithEmail}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Log In"}
        </Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Don't have an account? </Text>
        <Link href="/signup">Sign up</Link>
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
