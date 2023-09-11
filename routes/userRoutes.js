import express from 'express';
import { getAllUsers, loginController, registerController } from '../controllers/userController.js';

//router object
const router = express.Router();

//GET ALL USERS || GET
router.get('/all-users', getAllUsers);

//CREATE USER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

export default router;