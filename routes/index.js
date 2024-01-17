import express from 'express';
import UsersController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';
import ContactController from '../controllers/ContactController';
import upload from '../middleware/uploadFile';
import multer from 'multer';


const router = express.Router();

router.post('/users', UsersController.postNew);
router.post('/sign_in', AuthController.signIn);
router.get('/sign_out', AuthController.signOut);
router.get('/users/me', AuthController.getMe);
router.post('/contacts', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({status: 'error', message: err.message, data: null}).end();
    } else {
      ContactController.postContact(req, res);
    }})
})
router.get('/status', async (req, res) => {
  res.status(200).json({"status": "Green", "message": "All systems GO!!!"});
});

export default router;
