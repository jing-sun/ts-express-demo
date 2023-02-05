import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = async (password) => {
  // note, better to use async .hash instead of .hashSync per bcrypt readme
  return await bcrypt.hash(password, 5)
}


export const createJWT = (user) => {
  const { id, username } = user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET)

  return token
}

// middleware
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.send("No bearer, not authorized")
    return
  }

  const token = bearer.split(' ')[1]
  if (!token) {
    console.log('here')
    res.status(401)
    res.send('No token, not authorized')
    return
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    console.log(payload)
    next()
  } catch (err) {
    console.log(err)
    res.send(err)
  }
}