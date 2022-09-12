const express = require('express')
const router = express.Router()
const user = require('./user.routes')
const course = require('./course.routes.js')
const season = require('./season.routes.js')
const lesson = require('./lesson.routes.js')
const exam = require('./exam.routes')
const question = require('./question.routes')

/* -------------------------- prefix: /api/v1/admin/ ------------------------- */
router.use('/user', user)
router.use('/course', course)
router.use('/season', season)
router.use('/lesson', lesson)
router.use('/exam', exam)
router.use('/question', question)
module.exports = router