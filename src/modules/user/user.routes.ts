import  express, { Request, Response }  from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/all', userController.getAllFromDB);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export const UserRoutes = router;