//@ts-nocheck
import AWS from "aws-sdk";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config({ path: "../../.env" });


const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
});

const clientId = process.env.COGNITO_CLIENT_ID;
console.log("cleintId:", clientId);
const userPoolId = process.env.COGNITO_USER_POOL_ID;



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
    //console.log("userIdRegister:", userId);
    const newUser = new User({
      _id: userId,
      name: fullName,
      email: email
    });  
    console.log("hi")        
    await newUser.save();
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
