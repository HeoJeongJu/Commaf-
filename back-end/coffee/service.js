const errorMessages = require('../error/errorMessages');
const Coffee = require('./model');

async function _getList() {
    const coffeeList = await Coffee.find({});

    return coffeeList;
}

async function _getItem(name) {
    console.log(name);

    const coffeeItem = await Coffee.findOne({ name: name });

    if(!coffeeItem) {
        throw new Error(errorMessages.NOT_EXIST_COFFEE);
    }

    return coffeeItem;
}



module.exports = {
    _getList, _getItem
}


