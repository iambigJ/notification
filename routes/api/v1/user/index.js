const express = require('express')
const router = express.Router()
const course = require('./course.routes.js')
const lesson = require('./lesson.routes')
const user = require('./user.routes')
const exam = require('./exam.routes')


/* -------------------------- prefix: /api/v1/admin/ ------------------------- */
router.use('/course', course)
router.use('/lesson', lesson)
router.use('/exam', exam)
router.use('/', user)
module.exports = router