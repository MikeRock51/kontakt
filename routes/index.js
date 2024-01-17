import express from 'express';
import UsersController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
// import ChatController from "../controllers/ChatController";

const router = express.Router();

router.post('/users', UsersController.postNew);
router.post('/sign_in', AuthController.signIn);
// router.get('/sign_out', AuthController.getDisconnect);
// router.get('/users/me', AuthController.getMe);
// router.post("/chats", ChatController.createChat);
// router.get("/chats", ChatController.getChatHistory);
router.get('/status', async (req, res) => {
  res.status(200).json({"status": "Green", "message": "All systems GO!!!"});
});

export default router;
