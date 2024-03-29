import sha1 from "sha1";
import dbClient from "../storage/db";


class UserController {
  static async postNew(request, response) {
    const { email, password, username } = request.body;

    if (!email) {
      response.status(400).json({ error: "Missing email" }).end();
    } else if (!username) {
      response.status(400).json({ error: "Missing username" }).end();
    } else if (!password) {
      response.status(400).json({ error: "Missing password" }).end();
    } else if ((await dbClient.fetchUserByEmail({ email })) !== null) {
      response.status(400).json({ error: "User already exists" }).end();
    } else {
      const hashedPassword = sha1(password);
      const userID = await dbClient.createUser({
        email,
        username,
        password: hashedPassword,
      });

      response.status(201).json({ status: "User Created Successfully!", id: userID, email, username }).end();
    }
  }
}

export default UserController;
