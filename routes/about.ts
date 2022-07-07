import { Request, Response, Router } from 'express'

const router = Router()

router.get(`/`, (req: Request, res: Response) => {
  res.render(`about`, {
    title: `About`,
    isAbout: true
  })
})

export default router
