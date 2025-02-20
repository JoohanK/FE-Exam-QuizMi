import React, { useState } from "react";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { db } from "../../firebaseConfig";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = React.useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Write to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: user.email,
        email: user.email,
        profilePicture: "",
        createdAt: new Date(),
      });

      alert("User registered: " + user.email);
      setUser(user);
    } catch (error) {
      console.error("Registration error:", error);
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleSubmit} />

      <Button
        title="Already have an account? Sign in"
        onPress={() => router.push("/login")}
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
