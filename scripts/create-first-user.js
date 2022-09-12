const User = require('../models/User')
exports.create_first_user = async (req, res, next) => {
    const userData = {
        name: "Reza",
        role: "teacher",
        lastname: "mousavi",
        phone: "09148876040",
        passed_lessons: [{ title: "کلاس 1-2", lessonId: "63159271246c47eed06c4423" }]
    }
    const response = await User.findOne({ phone: '09148876040' })
    if (!response) {
        const user = new User(userData)
        await user.save()
        console.log('//====================== User Created ====================//')
    }

}


// SEND TO APP.js
