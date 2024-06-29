//@ts-nocheck
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });


const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
});

const clientId = process.env.COGNITO_CLIENT_ID;
console.log("cleintId:", clientId);
const userPoolId = process.env.COGNITO_USER_POOL_ID;

const addUser = (userData) => {

  const sql = `INSERT INTO users (user_id,name,email) VALUES (?,?,?)`;
  const values = [userData.id, userData.name, userData.email];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding dog:", err);
      res.status(500).json({ error: "Failed to add dog" });
    } else {
      console.log("Dog added successfully");
      res.status(200).json({ message: "Dog added successfully" });
    }
  });
};



export const register = async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  console.log(email, password, fullName, phoneNumber);

  if (!clientId) {
    res.status(500).json({ error: "COGNITO_CLIENT_ID is not defined" });
    return;
  }

  const params = {
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: fullName },
      { Name: "phone_number", Value: phoneNumber },
    ],
  };

  try {
    const signUpResponse = await cognito.signUp(params).promise();
    const userId = signUpResponse.UserSub;
    const userData = {name:fullName, email,id:userId};
    addUser(userData)
    console.log("User added successfully");
    res
      .status(200)
      .json({ message: "User registered and stored successfully", userId });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("Signing in")

  if (!clientId) {
    res.status(500).json({ error: "COGNITO_CLIENT_ID is not defined" });
    return;
  }

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    const userId = data.ChallengeParameters?.USER_ID_FOR_SRP;
    console.log(userId);
    res.status(200).json({ message: "User signed in successfully", userId });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(400).json({ error: error.message });
  }
};

export default { register, signIn };
