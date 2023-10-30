import { v4 as uuidv4 } from "uuid";

// This function generates a unique AccessToken for a user.
const generateAccessToken = () => {
  // Generate a UUIDv4 token for the user.
  const accessToken = uuidv4();
  return accessToken; 
};

export default generateAccessToken;
