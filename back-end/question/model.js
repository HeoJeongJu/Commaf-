const { mongoose, model }  = require("mongoose");

const questionSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    question: {
        type: String,
        require: true
    },
    options: {
        type: Array,
        require: true
    }
},
{
    versionKey: false
});

const questionModel = model('Question', questionSchema);

module.exports = questionModel;