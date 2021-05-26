import { Router } from 'express';
import userController from '../controllers/User';

const router = new Router();

router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:email', userController.update);
router.delete('/:email', userController.delete);

export default router;
