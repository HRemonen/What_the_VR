import express from 'express'
import cors from 'cors'
import path from 'path'
import pollTrainLocations from './services/trainLocationPoller'
import { PORT } from './utils/config'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  console.log('health request made')
  res.send('OK')
})

app.get('/api/locations', async (_req, res) => {
  const locations = await pollTrainLocations()
  res.json(locations)
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  const DIST_PATH = path.resolve(__dirname, '../../build')
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html')

  app.use(express.static(DIST_PATH))
  app.get('*', (req, res) => res.sendFile(INDEX_PATH))
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
