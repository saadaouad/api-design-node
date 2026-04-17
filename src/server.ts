import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { env, isDev, isTestEnv } from '../env.ts'
import { auth, habit, user } from './routes/index.ts'

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

// Health check endpoint (direct on app)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Habit Tracker API',
  })
})

// Mount routers with base paths
app.use('/api/auth', auth)
app.use('/api/users', user)
app.use('/api/habits', habit)

export { app }
export default app