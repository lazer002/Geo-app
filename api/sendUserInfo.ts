import axios from "axios";

export const sendUserData = async (data: any) => {
  try {
    console.log("Sending user data to backend");
    const res = await axios.post("https://lazerbackend.onrender.com/api/user-data", data);
    return res.data;
  } catch (error) {
    console.error("Failed to send user data:", error);
    return null;
  }
};
