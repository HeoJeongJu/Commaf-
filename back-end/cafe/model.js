const { mongoose, model }  = require("mongoose");

const cafeSchema = mongoose.Schema({
    sitetel: {
        type: String,
        require: true
    },
    sitewhladdr: {
        type: String,
        require: true
    },
    bplcnm: {
        type: String,
        require: true
    },
    x: {
        type: String,
        require: true
    },
    y: {
        type: String,
        require: true
    },
    coffee_name: {
        type: String,
        require: true
    }
},
{
    versionKey: false
});

const cafeModel = model('Cafe', cafeSchema);

module.exports = cafeModel;