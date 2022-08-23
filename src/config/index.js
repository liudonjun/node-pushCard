const port = 8088
const grant_type = 'client_credential'
const appid = ''
const secret = ''
const openId = ''
// 彩虹皮接口
const chpUrl = 'https://api.shadiao.pro/chp'
// 模板id
const templateIdOne = ''
const sendUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token='
const getTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token'
// 天气接口
const weatherUrl = '天气接口'
//错误返回
const errorResponse = (res) => {
  return {
    success: false,
    status: 200,
    data: res,
  }
}
module.exports = {
  port,
  errorResponse,
  grant_type,
  appid,
  secret,
  sendUrl,
  getTokenUrl,
  openId,
  templateIdOne,
  chpUrl,
  weatherUrl,
}
