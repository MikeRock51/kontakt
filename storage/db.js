import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { config } from "dotenv";

config();

class DBClient {
  constructor() {
    const database = process.env.DB;

    this.isConnected = false;
    this.usersCollection = null;
    this.contactsCollection = null;

    const password = process.env.DB_PASSWORD;
    console.log(password)
    const uri = `mongodb+srv://MikeRock:${password}@cluster0.qyotcp1.mongodb.net/${database}?retryWrites=true&w=majority`;

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.client
      .connect()
      .then(() => {
        this.isConnected = true;
        this.usersCollection = this.client.db().collection('users');
        this.contactsCollection = this.client.db().collection('contacts');
      })
      .catch((error) => {
        this.isConnected = false;
        console.log(error);
      });
  }

  isAlive() {
    return this.isConnected;
  }

  async fetchUserByEmail(email) {
    const response = await this.usersCollection.findOne(email);
    return response;
  }

  async createUser(user) {
    const response = await this.usersCollection.insertOne(user);
    return response.insertedId.toString();
  }

  async fetchUserByID(userID) {
    const user = await this.usersCollection.findOne({ _id: new ObjectId(userID) });
    return user;
  }

  async createContact(contact) {
    const response = await this.contactsCollection.insertOne(contact);
    return response.insertedId.toString();
  }

  async fetchContact(contactID) {
    const chats = await this.chatsCollection.findOne({ userID: new ObjectId(userID) });
    return chats;
  }

  /**
   * Updates the chat history in the chats collection.
   *
   * @param {string} chatID - The ID of the chat history.
   * @param {Array} updatedHistory - The updated chat history.
   * @returns {Promise<void>} - A Promise that resolves when the operation is complete.
   */
  async updateChatHistory(chatID, updatedHistory) {
    console.log(chatID);
    try {
      await this.chatsCollection.updateOne(
        { _id: chatID },
        { $set: { history: updatedHistory } }
      );
    } catch (error) {
      console.error("Error saving chat history:", error);
      throw error;
    }
  }
}

/**
 * Creates a singleton instance of the DBClient.
 */
const dbClient = new DBClient();

export default dbClient;
