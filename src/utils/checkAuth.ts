import { RequestHandler } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthRequest } from '../types/types.js'
import { MyJwtPayload } from '../types/types.js'


export const checkAuth: RequestHandler = (req: AuthRequest, res, next) => {
  const token = req.header('authorization')?.replace(/Bearer\s?/, '')
  if (token) {
    try {
      const secret = process.env.JWT_SECRET || 'secret'
      const decoded = jwt.verify(token, secret) as MyJwtPayload
      req.userId = decoded.id
      next()
    } catch (error) {
      return res.status(403).json({ message: 'Достеп не разрешен.' })
    }
  } else {
    return res.status(403).json({ message: 'Вы не авторизованы.' })
  }
}
