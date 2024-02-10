import Course from "../modules/Course.js"
import { RequestHandler } from "express"


//create Course
export const createCourse: RequestHandler = async (req, res) => {
  try {
    const { name, course } = req.body
    const newCourse = new Course({
      name,
      course: course
    })
    await newCourse.save()
    res.status(200).json({success: true, newCourse, message: 'Курс создан!'})
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Ошибка при обработке данных!' })
  }
}

//update Course
export const updateCourse: RequestHandler = async (req, res) => {
  try {
    const {name, course } = req.body
    const newCourses = await Course.findOne({ name })
    if (!newCourses) {
      res.status(400).json({ success: false, message: 'Валюта не найден!' })
    } else {
      newCourses.course = course
      await newCourses.save()
      const courses = await Course.find()
      return res.status(200).json({ courses, success: true, message: 'Курс успешно обновлен!' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Ошибка при обработке данных' })
  }
}

//get All Course
export const getAllCourse: RequestHandler = async (req, res) => {
  try {
    const courses = await Course.find()
    if (!courses) {
      return res.status(400).json({success: false, message: 'Ошибка при получении данных!'})
    }
    res.status(200).json({courses, success: true})
  } catch (error) {
    res.status(500).json({success: false, message: 'Ошибка при обработке данных!'})
  }
}
