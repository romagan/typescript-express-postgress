import { v4 as uuidv4 } from 'uuid'

import db from '../db/db'

export type ICourse = {
  title: string
  price: string
  img: string
  id: string
}

export type ICourses = ICourse[]

export class CourseController {
  title: string
  price: string
  img: string
  id: string

  constructor(title: string, price: string, img: string) {
    this.title = title
    this.price = price
    this.img = img
    this.id = uuidv4()
  }

  static async getAll() {
    const courses = await db.query('SELECT * FROM course')
    console.log(courses, 'coursescourses')
    return courses.rows
  }

  async save() {
    const courses: ICourses = await CourseController.getAll()

    courses.push({
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    })

    await db.query(`INSERT INTO course(title, price, img) VALUES ($1, $2, $3) RETURNING *`, [this.title, this.price, this.img])
  }
}
