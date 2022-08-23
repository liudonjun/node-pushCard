const { getAction, postAction } = require('./api/manage')
let express = require('express')
const { port, errorResponse, weatherUrl, grant_type, appid, secret, sendUrl, getTokenUrl, openId, templateIdOne, chpUrl } = require('./config/index')
const Dto = require('./config/Dto')
const Birthday = require('./config/Birthday')
const { getlunarDate, getDaysToBirthday, timeoutFunc } = require('./util/index')
let app = express()

// 拦截器
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.json(errorResponse('please contact liudongjun@ldjun.cn !'))
  // next()
})

// 第三接口 Promise
const p1 = getAction(weatherUrl, {})
const p3 = getAction(chpUrl, {})

// 日期对象
const date = new Date()

// 定时任务配置
const config = {
  interval: 1, //间隔天数，间隔为整数
  runNow: true, //是否立即运行
  time: '14:41:00', //执行的时间点 时在0~23之间
}

// 发送模板消息
function sendCard(flag) {
  Promise.all([p1, p3]).then(async ([res1, res3]) => {
    let obj = Object.create({})
    obj['date'] = new Dto(res1.data.date, '#fff') //日期
    obj['nong'] = new Dto('农历 ' + getlunarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()), '#fff') //日期
    obj['week'] = new Dto(res1.data.week, '#fff') //星期几
    obj['city'] = new Dto(res1.data.city, '#fff') //城市
    obj['wea'] = new Dto(res1.data.wea, '#fff') //天气
    obj['tem'] = new Dto(res1.data.tem_night + '~' + res1.data.tem_day + '℃', '#ddd') //温度
    obj['win'] = new Dto(res1.data.win + ` ${res1.data.win_speed} ${res1.data.win_meter}`, '#ddd') //风速
    obj['humidity'] = new Dto(res1.data.humidity, '#ddd') //空气湿度
    obj['word'] = new Dto(res3.data.data.text, '#ccc') //彩虹皮
    obj['Together'] = new Dto(Math.ceil((new Date() - new Date('2022-8-16')) / 1000 / 60 / 60 / 24), '#fff') //在一起多少天
    obj['gridBirthday'] = new Dto(new Birthday().getGridNumber(new Date().getFullYear()), '#fff') //baby
    obj['boyBirthday'] = new Dto(new Birthday().getBoyNumber(new Date().getFullYear()), '#fff') //me
    obj['loveDay'] = new Dto(getDaysToBirthday(8, 16), '#fff') //特殊日期
    const token = await getToken()
    let res = await postAction(sendUrl + token, {
      touser: openId, // 用户openid 3
      template_id: templateIdOne, // 模板id 4
      topcolor: '#FF0000',
      data: obj,
    })
    console.log('res: ', res.data)
  })
}

// 刷新token
async function getToken() {
  const params = { grant_type, appid, secret }
  let res = await getAction(getTokenUrl, params)
  return res.data.access_token
}

// 定时任务
timeoutFunc(config, sendCard)

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
