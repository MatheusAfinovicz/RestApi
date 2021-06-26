import { Router } from 'express';
import bookController from '../controllers/Book';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', bookController.index);
router.get('/:id', bookController.show);
router.post('/', loginRequired, bookController.create);
router.put('/:id', loginRequired, bookController.update);
router.delete('/:id', loginRequired, bookController.delete);

export default router;
