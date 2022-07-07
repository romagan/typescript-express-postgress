import { Request, Response, Router } from 'express'

import {Course} from '../models/course'
import {Cart} from '../models/cart'
const router = Router()

router.get(`/`, async (req: Request, res: Response) => {
  const cart = await Cart.fetch()
  res.render(`cart`, {
    isCart: true,
    courses: cart.courses,
    price: cart.price
  })
})

router.post(`/add`, async (req: Request, res: Response) => {
  const course = await Course.getById(req.body.id)
  if (!course) {
    return null
  }
  await Cart.add(course)
  res.redirect(`/cart`)
})

router.delete(`/remove/:id`, async (req: Request, res: Response) => {
  const cart = await Cart.remove(req.params.id)
  res.status(200).json(cart)
})

export default router
