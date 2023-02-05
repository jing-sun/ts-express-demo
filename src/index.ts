import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'
import app from './server'

// const PORT = process.env.PORT || 3000

app.listen(config.port, () => {
  console.log(`server on http://localhost:${config.port}`)
})