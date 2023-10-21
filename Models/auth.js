// auth.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async (email, password) => {
  // Implement your user creation logic here
  const user = { id: 1, email, password }; // Replace with your logic
  await AsyncStorage.setItem("userData", JSON.stringify(user));
  return user;
};

export const generateToken = (userId) => {
  // Generate a token for the user based on their ID
  return `token_${userId}`;
};
