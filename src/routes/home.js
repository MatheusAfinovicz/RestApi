import { Router } from 'express';
import homeController from '../controllers/Home';

const router = new Router();

router.post('/', homeController.create);

export default router;
