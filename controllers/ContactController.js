import dbClient from "../storage/db";

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
    contact.userID = userID;

    const contactID = await dbClient.createContact(contact);
    delete contact._id;
    response
      .status(201)
      .json({
        status: "Success",
        message: "Contact Created Successfully!",
        id: contactID,
        ...contact,
      })
      .end();
  }

  static async getContact(request, response) {
    const token = request.headers["auth_token"];

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
  }
}

export default ContactController;
