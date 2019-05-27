const { forwardTo } = require('prisma-binding')

const Query = {
    //TODO check authorization
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db')

};

module.exports = Query;
