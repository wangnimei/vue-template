const bodyParser = require('body-parser');
const userMock = require('./userMock');

// 解析mock路由, 目前只支持get, post两种方法
// 格式为 {
//   'get /mock/api': (req, res) => {}
// }
function parseApi(obj, app) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i += 1) {
    const method = keys[i].split(' ')[0];
    const url = keys[i].split(' ')[1];

    switch (method) {
      case 'get':
        app.get(url, obj[keys[i]]);
        break;
      case 'post':
        app.post(url, obj[keys[i]]);
        break;
      default:
        break;
    }
  }
}

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  parseApi(userMock, app);
};
