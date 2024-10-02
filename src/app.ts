import Express, { request, response } from 'express';
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const __static = join(__dirname, "../static")

const app = Express();

app.use('/', (req, res) => {
  const file = join(__static, 'index.html')
  res.sendFile(file)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
