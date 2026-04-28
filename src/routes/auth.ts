import { Router } from 'express';

import { register, login } from '../controllers/auth.ts';
import { validateBody } from '../middleware/index.ts';
import { loginSchema, registerSchema } from '../validators/auth.ts';

const router = Router();

router.post('/register', validateBody(registerSchema), register);

router.post('/login', validateBody(loginSchema), login);

export default router;
