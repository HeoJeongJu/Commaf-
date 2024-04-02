const { mongoose, model }  = require("mongoose");
const bcrypt =  require('bcrypt');

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

adminSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(err) {
        throw err;
    }
};

const adminModel = model('Admin', adminSchema);

module.exports = adminModel;