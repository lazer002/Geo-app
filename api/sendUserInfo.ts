import axios from "axios";

export const sendUserData = async (data: any) => {
  try {
    const res = await axios.post("https://your-backend.com/api/user-data", data);
    return res.data;
  } catch (error) {
    console.error("Failed to send user data:", error);
    return null;
  }
};
