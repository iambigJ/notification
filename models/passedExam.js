const mongoose = require("mongoose")

const schema = mongoose.Schema

const passedExamSchema = schema({
    courseId: {
        type: String
    },
    seasonId: {
        type: String
    },
    lessonId: {
        type: String
    },
    examId: {
        type: String
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: String
    },
    passing_mark: {
        type: String
    },
    passed: {
        type: Boolean,
        default: false
    },
    userAnswers: [{
        question: {
            type: String
        },
        answer: {
            type: Number
        },
        score: {
            type: Number,
            required: true
        },
        correct_answer: {
            type: Number
        }
    }]
}, {
    timestamps: true,
    collection: 'passedExam'
})
module.exports = mongoose.model('PassedExam', passedExamSchema);