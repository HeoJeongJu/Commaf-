const Cafe = require('./model');

async function _getCafeList(name) {
    const CafeList = await Cafe.find({ coffee_name: name });

    return CafeList;
}



module.exports = {
    _getCafeList
}


