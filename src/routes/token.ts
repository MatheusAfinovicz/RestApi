import { Router } from 'express';
import tokenController from '../controllers/Token';

const router = Router();

router.post('/', tokenController.create);

export default router;
