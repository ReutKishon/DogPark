import AWS from "aws-sdk";

AWS.config.update({ region: "us-east" });
const cognito = new AWS.CognitoIdentityServiceProvider();

const signup = async (req, res) => {
  const { email, password } = req.body;

  const cognitoParams = {
    username: email,
    password,
  };

  try {
    const cognitoUser = await new Promise((resolve, reject) => {
      cognito.signUp(cognitoParams, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    res.status(200).send({
      success: true,
      message: "User registered successfully",
      user: cognitoUser,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message, error });
  }
};

const signupConfirm = async (req, res) => {
  const { email, code } = req.body;
  const cognitoParams = {
    username: email,
    confirmationCode: code,
  };

  try {
    await new Promise((resolve, reject) => {
      CognitoIdentityService.signupConfirm(cognitoParams, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });

    // DB logic here
    // ...

    res.status(200).send({
      success: true,
      message: "User email confirmed successfully",
      user: {
        user_confirmed: true,
      },
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message, error });
  }
};

export default {
  signup,
  signupConfirm,
};
