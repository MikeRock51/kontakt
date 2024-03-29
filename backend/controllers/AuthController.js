import { v4 as uuidv4 } from "uuid";
import dbClient from "../storage/db";
import redisClient from "../storage/redis";
import sha1 from "sha1";


class AuthController {
  static async signIn(request, response) {
    try {
      const { email, password } = request.body;
      const user = await dbClient.fetchUserByEmail({ email });

      if (user) {
        const hashedPassword = sha1(password);

        if (hashedPassword === user.password) {
          const token = uuidv4();
          const key = `auth_${token}`;

          await redisClient.set(key, user._id.toString(), 86400);

          response
            .status(200)
            .json({
              status: "success",
              message: "Sign in successful",
              data: { auth_token: token, user },
            })
            .end();
        } else {
          response
            .status(401)
            .json({
              status: "error",
              message: "Incorrect password",
              data: null,
            })
            .end();
        }
      } else {
        response
          .status(401)
          .json({
            status: "error",
            message: "User does not exist",
            data: null,
          })
          .end();
      }
    } catch (error) {
      
      console.error(error);
      response
        .status(500)
        .json({ status: "error", message: "Internal Server Error", data: null })
        .end();
    }
  }

  static async signOut(request, response) {
    const token = request.headers["auth_token"];
    const key = `auth_${token}`;
    const userID = await redisClient.get(key);
    
    if (!userID) {
      response
        .status(401)
        .json({
          status: "error",
          message: "Invalid token",
          data: null,
        })
        .end();
    } else {
      const user = await dbClient.fetchUserByID(userID);

      if (!user) {
        response
          .status(404)
          .json({
            status: "error",
            message: "Invalid token",
            data: null,
          })
          .end();
      } else {
        await redisClient.del(key);
        response.status(204).json().end();
      }
    }
  }

  static async getMe(request, response) {
    const token = request.headers["auth_token"];
    const key = `auth_${token}`;

    try {
      const userID = await redisClient.get(key);

      if (!userID) {
        response
          .status(401)
          .json({
            status: "error",
            message: "Invalid token",
            data: null,
          })
          .end();
      } else {
        const user = await dbClient.fetchUserByID(userID);

        if (!user) {
          response
            .status(404)
            .json({
              status: "error",
              message: "User not found",
              data: null,
            })
            .end();
        } else {
          response
            .status(200)
            .json({
              status: "success",
              message: "Current user fetched successfully",
              data: {
                id: user._id,
                email: user.email,
                username: user.username,
              },
            })
            .end();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthController;
