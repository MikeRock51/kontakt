import dbClient from "../storage/db";

class ContactController {
  static async postContact(request, response) {
    const contact = request.body;
    const requiredFields = ["firstName", "phoneNumbers"];
    const optionalFields = ["lastName", "email"];

    requiredFields.map((field) => {
      if (!contact.hasOwnProperty(field)) {
        response
          .status(400)
          .json({ status: "error", message: `Missing required field: ${field}`, data: null })
          .end();
      }
      if (field === "phoneNumbers" && typeof(contact[field]) !== "object") {
        response
          .status(400)
          .json({ status: "error", message: "phoneNumbers field must be a object", data: null })
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

    const contactID = await dbClient.createContact(contact);
    delete contact._id
    response.status(201).json({ status: "Success", message: "Contact Created Successfully!", id: contactID, ...contact }).end();

  }
}

export default ContactController;
