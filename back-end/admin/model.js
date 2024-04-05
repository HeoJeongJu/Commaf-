const { mongoose, model }  = require("mongoose");

const adminSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    versionKey: false
});

const adminModel = model('Admin', adminSchema);

module.exports = adminModel;