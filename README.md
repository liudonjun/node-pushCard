### NodeJs 版本 测试号推送消息卡片

#### 所需地址

测试号地址
https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

天气接口文档
https://yiketianqi.com/index/doc?version=day

#### 使用说明

替换配置文件中测试号所需 appid，templateIdOne，secret，openId

#### 运行项目

```javascript
    npm i

    npm run dev
```

#### 目录结构

```javascript
node-serve
├─ .prettierrc
├─ package.json
├─ README.md
├─ src
│  ├─ api
│  │  └─ manage.js
│  ├─ config
│  │  ├─ Birthday.js 生日配置
│  │  ├─ Dto.js
│  │  └─ index.js 配置文件
│  ├─ index.js 配置颜色值
│  └─ util
│     ├─ index.js
│     └─ request.js
├─ template 模板demo
│  └─ template.md
├─ yarn-error.log
└─ yarn.lock

```
