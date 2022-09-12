const Notification = require('../models/Notification')
const ErrorResult = require('../tools/error.tool')


// /* ----------------------------- GET USERS LIST ----------------------------- */
// exports.getUsersList_Services = async () => {
//     const getUsers = await User.find()
//     return getUsers
// }
/* ----------------------------- GET USER BY ID ----------------------------- */
exports.addNewNotification_Services = async (informationBodyTaken) => {
    const notification = new Notification(informationBodyTaken)
    await notification.save()
    return notification
}
// /* ---------------------------- User ban or unban --------------------------- */
// exports.userBanOrUnBan_Services = async (userId) => {
//     const user = await User.findByIdAndUpdate(userId, { new: true }).select('isBan')
//     if (!user) {
//         throw ErrorResult.notFound("کاربر مورد نظر یافت نشد", "user_notfound")
//     }
//     if (user.isBan === false) {
//         user.isBan = true
//         await user.save()
//         return user
//     }
//     if (user.isBan === true) {
//         user.isBan = false
//         await user.save()
//         return user
//     }
// }
// /* ---------------------------- Change user role ---------------------------- */
// exports.userChangeRole_Services = async (userId, role) => {
//     const user = await User.findByIdAndUpdate(userId, { role: role }, { new: true })
//     if (!user) {
//         throw ErrorResult.notFound("کاربر مورد نظر یافت نشد", "user_notfound")
//     }
//     return user
// }
// /* ------------------------------- Delete user ------------------------------ */
// exports.deleteUser_Services = async (userId) => {
//     const user = await User.findByIdAndUpdate(userId, { deletedAt: new Date() }, { new: true })
//     if (!user) {
//         throw ErrorResult.notFound("کاربر مورد نظر یافت نشد", "user_notfound")
//     }
//     return user
// }
// /* ----------------------------- Restore Course ----------------------------- */
// exports.restoreUser_Services = async (userId) => {
//     const user = await User.findByIdAndUpdate(userId, { deletedAt: null }, { new: true })
//     if (!user) {
//         throw ErrorResult.notFound("کاربر مورد نظر یافت نشد", "user_notfound")
//     }
//     return user
// }
// /* --------------------------- Active or Inactive --------------------------- */
// exports.activeOrInactiveCourse_Services = async (courseId) => {
//     const course = await Course.findById(courseId)
//     if (!course) {
//         throw ErrorResult.notFound("آموزش مورد نظر یافت نشد", "course_notfound")
//     }
//     if (course.isActive === true) {
//         course.isActive = false
//         await course.save()
//         return 'آموزش مورد نظر غیرفعال شد'
//     }
//     if (course.isActive === false) {
//         course.isActive = true
//         await course.save()
//         return 'آموزش مورد نظر فعال شد'
//     }
// }
// /* ------------------------ Include picture to course ----------------------- */
// exports.uploadCoursePicture_Services = async (courseId, data) => {

//     const course = await Course.findById({ _id: courseId })
//     if (!course) {
//         throw ErrorResult.notFound("آموزش مورد نظر یافت نشد", "course_notfound")
//     }
//     course.image = data.fileName

//     await course.save()

//     return 'درس مورد نظر بروز شد'

// }