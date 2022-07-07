import { Request, Response, Router } from 'express'

import {CourseController} from '../controller/course'
import {Course as Courses} from '../models/course'
const router = Router()

router.get(`/`, async (req: Request, res: Response) => {
  const courses = await CourseController.getAll()

  res.render(`courses`, {
    title: `Courses`,
    isCourses: true,
    courses
  })
})

router.get(`/:id`, async (req: Request, res: Response) => {
  const course = await Courses.getById(req.params.id)

  if (!course) {
    return null
  }
  res.render(`course`, {
    layout: `card`,
    title: `Курс ${course.title}`,
    course
  })
})

router.get(`/:id/edit`, async (req: Request, res: Response) => {
  if (!req.query.allow) {
    return res.redirect(`/`)
  }

  const course = await Courses.getById(req.params.id)
  if (!course) {
    return null
  }

  res.render(`course-edit`, {
    title: `Редактировать ${course.title}`,
    course
  })
})

router.post(`/edit`, async (req: Request, res: Response) => {
  await Courses.update(req.body)
  res.redirect(`/courses`)
})

export default router
