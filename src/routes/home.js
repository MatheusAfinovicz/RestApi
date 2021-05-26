import { Router } from 'express';
import homeController from '../controllers/Home';

const router = new Router();

router.get('/', homeController.index);
router.post('/', homeController.create);

export default router;
