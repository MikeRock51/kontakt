import express from "express";
import UsersController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import ContactController from "../controllers/ContactController";
import upload from "../middleware/uploadFile";
import redisClient from "../storage/redis";

const router = express.Router();

router.post("/users", UsersController.postNew);
router.post("/sign_in", AuthController.signIn);
router.get("/sign_out", AuthController.signOut);
router.get("/users/me", AuthController.getMe);
router.post("/contacts", async (req, res) => {
  const token = req.headers["auth_token"];

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized! auth-token required",
      data: null,
    });
  }

  const key = `auth_${token}`;
  const userID = await redisClient.get(key);

  if (!userID) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized! invalid token",
      data: null,
    });
  }
  upload(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", message: err.message, data: null })
        .end();
    } else {
      ContactController.postContact(req, res, userID);
    }
  });
});
router.put("/contacts/:contactID", async (req, res) => {
  const token = req.headers["auth_token"];

  if (!token) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized! auth-token required",
      data: null,
    });
  }

  const key = `auth_${token}`;
  const userID = await redisClient.get(key);

  if (!userID) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized! invalid token",
      data: null,
    });
  }
  upload(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ status: "error", message: err.message, data: null })
        .end();
    } else {
      ContactController.updateContact(req, res, userID);
    }
  });
});
router.get("/users/contacts", ContactController.getUserContacts);
router.get("/contacts/:contactID", ContactController.getContact);
router.get("/status", async (req, res) => {
  res.status(200).json({ status: "Green", message: "All systems GO!!!" });
});

export default router;
