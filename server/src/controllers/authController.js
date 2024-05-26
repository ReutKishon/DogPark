import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION,
});

const clientId = process.env.COGNITO_CLIENT_ID;
const userPoolId = process.env.COGNITO_USER_POOL_ID;

export const register = async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;
  console.log(email, password, fullName, phoneNumber);
  const db = req.db;

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
    console.log("userId: ");

    const signUpResponse = await cognito.signUp(params).promise();
    console.log("userId2: " + signUpResponse.$response);

    const userId = signUpResponse.UserSub;
    console.log("userId: " + userId);
    await db.execute("INSERT INTO users (user_id,name, email) VALUES (?,?,?)", [
      userId,
      fullName,
      email,
    ]);
    console.log("User registered and stored successfully");
    res
      .status(200)
      .json({ message: "User registered and stored successfully", userId });
  } catch (error) {
    console.log("error: " + error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signInUser = async (req, res) => {
  const { username, password } = req.body;

  if (!clientId) {
    res.status(500).json({ error: "COGNITO_CLIENT_ID is not defined" });
    return;
  }

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    res.status(200).json({ message: "User signed in successfully", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { register,signIn };
