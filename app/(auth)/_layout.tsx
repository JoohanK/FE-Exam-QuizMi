// _layout.tsx (auth)
import { Slot } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Redirect } from "expo-router";

export default function Layout() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect href="/" />; // Redirect to index if user is logged in
  }

  return <Slot />;
}
