import { Router } from 'express';
import userController from '../controllers/User';

const router = new Router();

router.get('/:id', userController.show);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
