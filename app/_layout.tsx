import { Router, Slot, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { Redirect } from "expo-router";
import { Text } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
