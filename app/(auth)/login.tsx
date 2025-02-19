import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext"; // Importera AuthContext

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const { setUser, user } = React.useContext(AuthContext);

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        alert("User signed in: " + userCredential.user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        setUser(userCredential.user);
        alert("User signed in with google: " + userCredential.user.email);
        console.log(userCredential.user.displayName);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Sign in" onPress={handleSubmit} />
      <Button title="Sign in with Google" onPress={handleGoogleLogin} />
      <br />
      <Button
        title="Don't have an account? Register"
        onPress={() => router.push(`/register`)}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    maxWidth: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
