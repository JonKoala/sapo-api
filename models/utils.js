var utils = {};

utils.bulkOperation = (model, operation, data, limit, index) => {
  limit = (limit) ? limit : 500;
  index = (index) ? index : 0;

  var begin = index * limit;
  var parts = Math.ceil(data.length / limit);
  var slice = data.slice(begin, begin + limit);

  return operation.call(model, slice).then(() => {
    index++;
    if (parts === index) return;
    return utils.bulkOperation(model, operation, data, limit, index);
  });
}

module.exports = utils;
