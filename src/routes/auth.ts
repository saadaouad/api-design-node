import { Router } from 'express'

import { register, login } from '../controllers/auth.ts'
import { insertUserSchema } from '../db/schema.ts'
import { validateBody } from '../middleware/validation.ts'
import { loginSchema } from '../schema-validation/auth.ts'

const router = Router()

router.post('/register', validateBody(insertUserSchema), register)

router.post('/login', validateBody(loginSchema), login)

export default router
