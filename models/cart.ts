import fs from 'fs'
import path from 'path'

import {ICourse} from './course'

//Another way to get path
const PATH = path.join(process.cwd(), `data`, `cart.json`)

type ICart = {
  price: number
  courses: ICartCourse[]
}

export interface ICartCourse extends ICourse {
  count: number
}

export class Cart {
  static async #writeFile(data: ICart) {
    return new Promise<ICart>((resolve, reject) => {
      fs.writeFile(PATH, JSON.stringify(data), (err: any) => {
        if (err) reject(err)

        resolve(data)
      })
    })
  }

  static async add(course: ICourse) {
    const cart: ICart = await Cart.fetch()
    const isAddedIdx = cart.courses.findIndex((item) => item.id === course.id)

    if (isAddedIdx !== -1) {
      cart.courses[isAddedIdx].count++
    } else {
      cart.courses.push({...course, count: 1})
    }

    cart.price += +course.price

    await Cart.#writeFile(cart)
  }

  static async remove(id: string) {
    const cart: ICart = await Cart.fetch()

    const idx = cart.courses.findIndex((item) => item.id === id)
    const course = cart.courses[idx]

    if (course.count > 1) {
      course.count--
    } else {
      cart.courses = [...cart.courses.slice(0, idx), ...cart.courses.slice(idx + 1)]
    }

    cart.price -= +course.price

    await Cart.#writeFile(cart)

    return cart
  }

  static async fetch() {
    return new Promise<ICart>((resolve, reject) => {
      fs.readFile(PATH, `utf-8`, (err: any, data: string) => {
        if (err) reject(err)

        resolve(JSON.parse(data))
      })
    })
  }
}
