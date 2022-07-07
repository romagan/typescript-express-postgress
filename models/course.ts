import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export type ICourse = {
  title: string
  price: string
  img: string
  id: string
}

export type ICourses = ICourse[]

type IError = {
  status: number
  message: string
}

export class Course {
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

  static async #writeFile(courses: ICourses) {
    return new Promise<void>((res, rej) => {
      fs.writeFile(
        path.join(__dirname, `../../data/courses.json`),
        JSON.stringify(courses),
        (err: any) => {
          if(err) rej(err)

          res()
        }
      )
    })
  }

  static async getAll() {
    return new Promise<ICourses>((res, rej) => {
      fs.readFile(
        path.join(__dirname, `../../data/courses.json`),
        `utf-8`,
        (err: any, data: string) => {
        if (err) rej(err)
        res(JSON.parse(data))
      })
    })
  }

  static async getById(id: string) {
    const courses: ICourses = await Course.getAll()

    return courses.find((course) => course.id === id)
  }

  async save() {
    const courses: ICourses = await Course.getAll()

    courses.push({
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    })

    await Course.#writeFile(courses)
  }

  static async update(updatedCourse: ICourse) {
    const courses: ICourses = await Course.getAll()
    const idx = courses.findIndex((course) => course.id === updatedCourse.id)
    courses[idx] = updatedCourse

    await Course.#writeFile(courses)
  }
}
