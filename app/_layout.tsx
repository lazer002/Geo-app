// app/_layout.tsx
import { Slot } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { collectUserInfo } from "../utils/collectUserInfo";
import { sendUserData } from "../api/sendUserInfo";
import '../global.css'
export default function Layout() {
  useEffect(() => {
    const sendOnce = async () => {
      const alreadySent = await SecureStore.getItemAsync("isDataSent");

      if (!alreadySent) {
        try {
          const data = await collectUserInfo();
          await sendUserData(data);
          await SecureStore.setItemAsync("isDataSent", "true");
          console.log("User data sent successfully");
        } catch (err) {
          console.warn("Failed to send user info", err);
        }
      }
    };

    sendOnce();
  }, []);

  return <Slot />;
}
