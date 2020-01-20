const Mock = require('mockjs');

module.exports = {
  // 获取用户信息
  'get /mock/getUser': (req, res) => {
    res.send(Mock.mock({
      code: 0,
      'data|10': [{
        'id|+1': 1,
        name: '@cname',
        email: '@email',
        phone: '13666261185',
      }],
      msg: '请求成功',
    }));
  },
  // 添加用户
  'post /mock/addUser': (req, res) => {
    const { body } = req;
    res.send({
      code: 0,
      data: body,
      msg: '请求成功',
    });
  },
};
