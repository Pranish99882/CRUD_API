import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { userSchema } from '../models/user';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', validationMiddleware(userSchema), createUser);
router.patch('/users/:id', validationMiddleware(userSchema), updateUser);
router.delete('/users/:id', deleteUser);

export default router;
