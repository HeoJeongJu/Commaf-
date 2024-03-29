const { mongoose, model }  = require("mongoose");

const coffeeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    region: {
        type: String,
        require: true
    },
    weight: {
        type: Number,
        require: true
    },
    flavor_profile: {
        type: Array,
        require: true
    },
    grind_option: {
        type: Array,
        require: true
    },
    roast_level: {
        type: Number,
        require: true
    },
    image_url: {
        type: String,
        require: true
    }
},
{
    versionKey: false
});

const coffeeModel = model('Coffee', coffeeSchema);

module.exports = coffeeModel;