import dbClient from "../storage/db";
import redisClient from "../storage/redis";
import { ObjectId } from "mongodb";
import deleteFile from "../middleware/deleteFile";

class ContactController {
  static async postContact(request, response, userID) {
    const contact = request.body;
    const requiredFields = ["firstName", "phoneNumbers"];
    const optionalFields = ["lastName", "email", "title"];

    requiredFields.map((field) => {
      if (!contact[field]) {
        response
          .status(400)
          .json({
            status: "error",
            message: `Missing required field: ${field}`,
            data: null,
          })
          .end();
      }
      if (field === "phoneNumbers")
        try {
          contact.phoneNumbers = JSON.parse(contact.phoneNumbers);
        } catch (error) {
          response
            .status(400)
            .json({
              status: "error",
              message: "phoneNumbers field must be an object",
              data: null,
            })
            .end();
        }
    });

    for (const [key, value] of Object.entries(contact)) {
      if (
        !value ||
        (!requiredFields.includes(key) && !optionalFields.includes(key))
      ) {
        delete contact[key];
      }
    }

    if (request.file) {
      contact.avatar = request.file.filename;
    }
    contact.userID = new ObjectId(userID);
    contact.views = 0;

    const contactID = await dbClient.createContact(contact);
    // delete contact._id;
    response
      .status(201)
      .json({
        status: "Success",
        message: "Contact Created Successfully!",
        // id: contactID,
        ...contact,
      })
      .end();
  }

  static async getUserContacts(request, response) {
    const token = request.headers["auth_token"];

    if (!token) {
      response
        .status(401)
        .json({
          status: "error",
          message: "Unauthorized! auth-token required",
          data: null,
        })
        .end();
    }

    const key = `auth_${token}`;
    const userID = await redisClient.get(key);

    if (!userID) {
      response
        .status(401)
        .json({
          status: "error",
          message: "Unauthorized! invalid token",
          data: null,
        })
        .end();
    }

    const contacts = await dbClient.fetchUserContacts(userID);

    response
      .status(200)
      .json({
        status: "Success",
        message: "User contacts retrieved successfully!",
        data: contacts,
      })
      .end();
  }

  static async getContact(request, response) {
    const token = request.headers["auth_token"];
    const contactID = request.params.contactID;

    if (!token) {
      response.status(401).json({
        status: "error",
        message: "Unauthorized! auth-token required",
        data: null,
      });
    }

    const key = `auth_${token}`;
    const userID = await redisClient.get(key);

    if (!userID) {
      response.status(401).json({
        status: "error",
        message: "Unauthorized! invalid token",
        data: null,
      });
    }

    if (!contactID) {
      response.status(400).json({
        status: "error",
        message: "Missing required contactID",
        data: null,
      });
    }

    const contact = await dbClient.fetchContact(contactID);

    if (!contact) {
      response
        .status(404)
        .json({
          status: "Error",
          message: "Contact not found!",
          data: null,
        })
        .end();
    } else if (contact.userID.toString() !== userID) {
      response
        .status(401)
        .json({
          status: "Error",
          message: "You are not authorized to view this contact!",
          data: null,
        })
        .end();
    }

    const updatedContact = await dbClient.updateContactView(contactID);

    response
      .status(200)
      .json({
        status: "Success",
        message: "Contact retrieved successfully!",
        data: updatedContact,
      })
      .end();
  }

  static async updateContact(request, response, userID) {
    const contactID = request.params.contactID;
    const updateData = request.body;
    const contactFields = [
      "firstName",
      "phoneNumbers",
      "lastName",
      "email",
      "title",
    ];

    if (!contactID) {
      response.status(400).json({
        status: "error",
        message: "Missing required contactID",
        data: null,
      });
    }

    const contact = await dbClient.fetchContact(contactID);
    if (!contact) {
      response
        .status(404)
        .json({
          status: "Error",
          message: "Contact not found!",
          data: null,
        })
        .end();
    } else if (contact.userID.toString() !== userID) {
      return response
        .status(401)
        .json({
          status: "error",
          message: "You are not authorized to update this contact!",
          data: null,
        })
        .end();
    }

    for (const [key, value] of Object.entries(updateData)) {
      if (!value || !contactFields.includes(key)) {
        delete updateData[key];
      }
    }

    if (request.file) {
      deleteFile(contact.avatar);
      updateData.avatar = request.file.filename;
    }

    let updatedContact;
    try {
      updatedContact = await dbClient.updateContact(contactID, updateData);
    } catch (error) {
      response
        .status(503)
        .json({
          status: "error",
          message: `Error updating contact: ${error.message}`,
          data: null,
        })
        .end();
    }

    response
      .status(200)
      .json({
        status: "success",
        message: "Contact updated successfully!",
        data: updatedContact,
      })
      .end();
  }

  static async deleteContact(request, response) {
    const contactID = request.params.contactID;
    const token = request.headers["auth_token"];

    if (!token) {
      response.status(401).json({
        status: "error",
        message: "Unauthorized! auth_token required",
        data: null,
      });
    }

    const key = `auth_${token}`;
    const userID = await redisClient.get(key);

    if (!userID) {
      response.status(401).json({
        status: "error",
        message: "Unauthorized! invalid token",
        data: null,
      });
    }

    if (!contactID) {
      response.status(400).json({
        status: "error",
        message: "Missing required contactID",
        data: null,
      });
    }

    const contact = await dbClient.fetchContact(contactID);

    if (!contact) {
      response
        .status(404)
        .json({
          status: "Error",
          message: "Contact not found!",
          data: null,
        })
        .end();
    } else if (contact.userID.toString() !== userID) {
      response
        .status(401)
        .json({
          status: "Error",
          message: "You are not authorized to delete this contact!",
          data: null,
        })
        .end();
    }

    try {
      await dbClient.deleteContact(contactID);
    } catch (error) {
      return response
        .status(200)
        .json({
          status: "error",
          message: `Error deleting contact: ${error.message}`,
          data: null,
        })
        .end();
    }

    if (request.file) {
      deleteFile(contact.avatar);
      updateData.avatar = request.file.filename;
    }

    response
      .status(200)
      .json({
        status: "success",
        message: "Contact deleted successfully!",
        data: null,
      })
      .end();
  }
}

export default ContactController;
