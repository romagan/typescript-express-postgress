import { Request, Response, Router } from 'express'
const router = Router()

router.get(`/`, (req: Request, res: Response) => {
  // res.sendFile(path.join(__dirname, `views`, `index.html`))
  res.render(`index`, {
    title: `Main`,
    isMain: true
  }) //после подключения шаблонизатора
})

export default router
