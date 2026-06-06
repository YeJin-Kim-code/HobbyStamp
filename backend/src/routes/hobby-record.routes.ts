import { Router } from 'express';
import {
  createHobbyRecord,
  getHobbyRecords,
  getHobbyRecordsByHobby,
  getHobbyRecordById,
  updateHobbyRecord,
  deleteHobbyRecord,
} from '../controllers/hobby-record.controller';

const router = Router();

router.post('/', createHobbyRecord);

router.get('/', getHobbyRecords);

router.get('/hobby/:hobbyId', getHobbyRecordsByHobby);

router.get('/:id', getHobbyRecordById);

router.patch('/:id', updateHobbyRecord);

router.delete('/:id', deleteHobbyRecord);

export default router;