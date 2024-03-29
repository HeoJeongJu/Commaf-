const { mongoose, model }  = require("mongoose");

const questionResultSchema = mongoose.Schema({
    sub_title: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    sub_name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img_url: {
        type: String,
        require: true
    }
},
{
    versionKey: false
});

const questionResultModel = model('QuestionResult', questionResultSchema);

module.exports = questionResultModel;