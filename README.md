#### 安装
```javascript
npm i bestime-jsonp
```

#### 引入到项目
```javascript
// 方式一
const jsonp = require('bestime-jsonp')

// 方式二
import jsonp from 'bestime-jsonp'

// 方式三
<script src="https://cdn.jsdelivr.net/npm/bestime-jsonp@latest/jsonp.min.js"></script>
```


#### 参数详解

|       参数      |   类型  |  必填   | 默认 |描述 |
| ------------    | -----:  | -----:  | -----:  | -----:  |
| url             | String  | `是` |    无   | 请求的地址   |
| callback_name   | String  |  否  | 自动生成 |后端定义的接收callback名的字段   |
| callback_handle | String  |  否  | 自动生成 |前端callback名   |
| timeout         | Number  |  否  |    无   |超时，超时后进error   |
| cache           | Boolean |  否  | `true`  | 缓存 |



#### 请求静态 js文件
```javascript
jsonp({
  url: './data.js',
  callback_handle: 'cb',
  success: function (res) {
    console.log(res)
  }
})
```

#### 请求动态js (后端配合)
```javascript
// 后端动态生成（该例子为：nodejs）
app.get('/jsonp-test', (req, res) => {
  const { node_callback } = req.query
  res.send(`${node_callback}(${JSON.stringify({
    code: 1,
    msg: `当前函数名：${node_callback}`,
    data: [
      { name: 'Bestime', jon: 'web前端' }
    ]
  })})`)
})
```
```javascript
// 前端js
jsonp({
  url: 'http://192.168.0.224:9998/jsonp-test',
  callback_name: 'node_callback', // 后端接收的callback字段
  callback_handle: null, // 前端callback函数名，null就自动生成
  success: function (res) {
    console.log(res)
  },
  error: function () {
    alert('请求失败')
  }
})
```

#### 请求json文件
```javascript
jsonp({
  url: './data.json',
  callback_handle: 'cb',
  success: function (res) {
    console.log(res)
  }
})
```

#### 请求超时 (网络慢时)
```javascript
jsonp({
  url: './data.js',
  timeout: 300,
  callback_handle: 'cb',
  success: function () {
    console.log('成功，请调慢网速')
  },
  error: function () {
    console.log('失败')
  }
})
```

#### 请求到错误地址
```javascript
jsonp({
  url: './data-404.js',
  error: function () {
    console.log('失败')
  }
})
```