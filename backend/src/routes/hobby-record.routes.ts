import { Router } from 'express';
import { createHobbyRecord } from '../controllers/hobby-record.controller';

const router = Router();

router.post('/', createHobbyRecord);

export default router;