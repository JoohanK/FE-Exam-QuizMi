// index.tsx
import React, { useEffect, useContext } from "react";
import { Text, Button, View } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        router.replace("/login");
      }
    });

    return unsubscribe; // Viktigt: Avsluta lyssnaren när komponenten avmonteras
  }, []); // Tom dependency array för att köra en gång vid montering

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Uppdatera AuthContext efter utloggning
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return null; // Visa ingenting medan autentiseringstillståndet kontrolleras
  }

  return (
    <View>
      <Text>hej</Text>
      <Text>Signed in as: {user?.email || "Guest"}</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
}
