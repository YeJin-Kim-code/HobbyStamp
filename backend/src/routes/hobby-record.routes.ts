import { Router } from 'express';
import {
  createHobbyRecord,
  getHobbyRecords,
  getHobbyRecordsByHobby,
  getHobbyRecordById,
} from '../controllers/hobby-record.controller';

const router = Router();

router.post('/', createHobbyRecord);

router.get('/', getHobbyRecords);

router.get('/hobby/:hobbyId', getHobbyRecordsByHobby);

router.get('/:id', getHobbyRecordById);

export default router;