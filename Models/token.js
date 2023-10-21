// token.js

const uuid = require("uuid");
const tokens = {};

function generateToken(userId) {
  const token = uuid.v4();
  tokens[token] = userId;
  return token;
}

function getUserIdFromToken(token) {
  return tokens[token];
}

export { generateToken, getUserIdFromToken };
