import { Router } from 'express';
import userController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

//  GET route only for testing purposes
// router.get('/', userController.show);

router.post('/', userController.create);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
