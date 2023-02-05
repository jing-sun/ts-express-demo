// const http = require('http')

// const server = http.createServer(async (req, res) => {
//   if (req.url === "/" && req.method === "GET") {
//     console.log(`request coming in at /`)
//     console.log(req.headers)

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ message: "hello" }));

//     res.end();

//     console.log(res.statusCode)
//     return;
//   }

//   res.writeHead(404, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "nope" }));
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
//   console.log(`server on http://localhost:${PORT}`);
// })

import express from 'express'
import router from './routes'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.shhh_secret = 'doggy'
  next()

  // res.status(401)
  // res.send('Nope')
})

app.get('/', (req, res) => {
  console.log(`request coming in at /`)
  console.log(req.headers)
  res.status(200)
  res.json({ message: 'hello' })
})

// demo throwing an async error using next
app.get(`/async-error`, (req, res, next) => {
  setTimeout(() => {
    next(new Error(`throwing an async Error here`))
  }, 1)
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

// put error handlers at the bottom
app.use((err, req, res, next) => {
  // for synchronous errors
  // console.log(err)
  // res.json({ message: `Oops, there was an error` })

  if (err.type === 'auth') {
    res.status(401).json({ message: 'unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input', error: err })
  } else {
    res.status(500).json({ message: 'server error' })
  }
})

export default app