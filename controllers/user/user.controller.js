const BaseController = require('../Base.controller')

exports.doGetUserGET_Controller = async (req, res) => {
    const user = req.user
    BaseController.ok(res, { user })
}

exports.doEditUserPUT_Controller = async (req, res) => {
    const id = get.user._id
    const {
        title,
        description,
    } = req.body
    const data = {
        title,
        description,
    }
    const result = await courseService.editCourse_Services(courseId, data)
    BaseController.ok(res, result)
}
