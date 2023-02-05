import { nextTick } from 'process'
import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    })

    const token = createJWT(user)
    res.json({ token })
  } catch (e) {
    e.type = 'input'
    next(e)
  }
}

export const signIn = async (req, res, next) => {
  try {
    // find user, note: username is unique based on prisma schema
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
      res.status(401)
      res.json({ message: 'Invalid password' })
      return
    }

    // successful login, create and send a JWT back to user
    const token = createJWT(user)
    res.json({ token })
  } catch (e) {
    e.type = 'auth'
    next(e)
  }
}