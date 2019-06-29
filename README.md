


#### 参数详解

| 参数        | 描述  | 
| --------   | -----:  |
| url      | 请求的地址   |
| callback_name      | 后端定义的接收callback名的字段   |
| callback_handle      | 前端callback名   |
| timeout      | 超时，默认无，超时后进error   |

#### 安装
```javascript
npm i bestime-jsonp
```

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
    error: function (err) {
        console.log(err)
    }
})
```

#### 请求到错误地址
```javascript
jsonp({
    url: './data-404.js',
    error: function (err) {
        console.log(err)
    }
})
```