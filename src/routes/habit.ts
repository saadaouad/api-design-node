import { Router } from 'express';

import {
  createHabit,
  getUserHabits,
  getHabitById,
  updateHabit,
  deleteHabit
} from '../controllers/habit.ts';
import { authenticateToken } from '../middleware/auth.ts';
import { validateBody, validateParams } from '../middleware/validation.ts';
import { createHabitSchema, updateHabitSchema, uuidSchema } from '../schema-validation/habit.ts';

const router = Router();

router.use(authenticateToken);

router.get('/', getUserHabits);

router.get('/:id', validateParams(uuidSchema), getHabitById);

router.post('/', validateBody(createHabitSchema), createHabit);

router.put(
  '/:id',
  validateParams(uuidSchema),
  validateBody(updateHabitSchema),
  updateHabit
);
router.patch('/:id', validateParams(uuidSchema), validateBody(updateHabitSchema), updateHabit);
router.delete('/:id', validateParams(uuidSchema), deleteHabit);

export default router;
