const request = require("../util/request");
const postAction = (url, parameter) => {
  return request({
    url: url,
    method: "post",
    data: parameter,
  });
};
const getAction = (url, parameter) => {
  return request({
    url: url,
    method: "get",
    params: parameter,
  });
};
module.exports = { postAction, getAction };
