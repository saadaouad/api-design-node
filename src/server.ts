import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { auth, habit, user } from './routes/index.ts'
import { errorHandler } from './middleware/errorHandler.ts'
import { env, isTestEnv } from '../env.ts'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  morgan('dev', {
    skip: () => isTestEnv(),
  })
)

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Habit Tracker API',
  })
})

app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/habits', habit)

app.use(errorHandler)

export { app }
export default app