const { forwardTo } = require('prisma-binding')

const Query = {
    //TODO check authorization
    items: forwardTo('db')

};

module.exports = Query;
