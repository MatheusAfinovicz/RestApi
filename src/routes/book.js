import { Router } from 'express';
import bookController from '../controllers/Book';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', bookController.show);
router.post('/', loginRequired, bookController.create);
router.put('/', loginRequired, bookController.update);
router.delete('/', loginRequired, bookController.delete);

export default router;
