import { Request, Response, Router } from 'express'
import db from '../db/db'
import {CourseController} from '../controller/course'

// import {Course} from '../models/course'
const router = Router()

router.get(`/`, (req: Request, res: Response) => {
  res.render(`add-course`, {
    title: `Add Course`,
    isAddCourse: true
  })
})

router.post(`/`, async(req: Request, res: Response) => {
  const {title, price, img} = req.body

  const course = new CourseController(title, price, img)
  console.log(course, 'course ousfu')

  await course.save()

  res.redirect('/courses')
})

export default router
