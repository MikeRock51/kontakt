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

  // Retrieved all contacts associated with the user based on userID
  async fetchUserContacts(userID) {
    const contacts = await this.contactsCollection.find({ userID: new ObjectId(userID) });
    return contacts.toArray();
  }

  // Retrieve a single contact based on id
  async fetchContact(contactID) {
    const contact = await this.contactsCollection.findOne({ _id: new ObjectId(contactID) });
    return contact;
  }

  async updateContact(contactID, updateData) {
    try {
      const contact = await this.contactsCollection.findOneAndUpdate(
        { _id: new ObjectId(contactID) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
      return contact;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  }
}


const dbClient = new DBClient();

export default dbClient;
