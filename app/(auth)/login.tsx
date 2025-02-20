import React, { useState, useEffect } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import { auth, db } from "../../firebaseConfig"; // Ensure db is imported
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const { setUser, user } = React.useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);

      alert("User signed in: " + userCredential.user.email);
    } catch (error) {
      alert(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, create a new document
        await setDoc(userDocRef, {
          username: user.displayName || user.email, // Use displayName from Google if available
          email: user.email,
          profilePicture: user.photoURL || "", // Google provides a photoURL
          createdAt: new Date(),
        });
        alert("New user registered with Google: " + user.email);
      } else {
        alert("User signed in with Google: " + user.email);
      }

      setUser(user);

      console.log(user.displayName);
    } catch (error) {
      console.error("Google login error:", error);
      alert(error);
    }
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
      <View style={{ height: 10 }} /> {/* Replaced <br /> */}
      <Button title="Sign in with Google" onPress={handleGoogleLogin} />
      <View style={{ height: 10 }} />
      <Button
        title="Don't have an account? Register"
        onPress={() => router.push("/register")}
      />
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
