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
          .json({ error: `Missing required field: ${field}` })
          .end();
      }
      if (field === "phoneNumbers" && typeof(contact[field]) !== "object") {
        response
          .status(400)
          .json({ error: "phoneNumbers field must be a object" })
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

    // const userID = await dbClient.createContact({
    //     email,
    //     username,
    //     password: hashedPassword,
    // });

    // response.status(201).json({ status: "User Created Successfully!", id: userID, email, username }).end();

    console.log(contact);
    response.status(200).json({ status: "done" }).end();
  }
}

export default ContactController;
