
/*
强缓存
    不请求服务器 返回状态码200
    1.0  expires   问题  服务器和客户端时间可能不一致，客户端可以自己设置。。。。
    
    1.1   cache-control
              public 
              private
              no-cahce
              no-store
              must-revalidation/proxy-revalidation
              max-age=xxx

    上诉两个  后者优先

协商缓存
    请求服务器验证是否更新
      last-modified   服务端写入
      if-modified-since   客户端带回来

    etag if-node-mathc

*/

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>React App</title>
</head>

<body>
</body>
<script src='main.js'></script>
      
      
<script src='b.js'></script>
<script src='c.js'></script>
</html>
`

const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url
  switch (url) {
    case '/':
      res.end(html)
      return
    case '/main.js':
      const t = new Date(Date.now() + 10000).toUTCString();
      console.log(t)
      res.setHeader('Expires', t);
      res.end(new Date() + '');
      return
    case '/b.js':
      res.setHeader('Cahe-control', 'no-cache');
      res.setHeader('last-modified', new Date().toUTCString())
      const lts = new Date(req.headers['if-modified-since']).getTime()
      console.log('if-modified-since', lts);
      if ((lts + 30000) > Date.now()) {
        console.log('缓存命中');
        res.statusCode = 304
        res.end()
      } else {
        res.end('11111111111111111111111111')
      }

      return

    case '/c.js':
      const crypto = require('crypto')
      const content = ';xxxx'
      const hash = crypto.createHash('sha1').update(content).digest('hex')
      res.setHeader('Etag', hash)
      if (req.headers['if-none-match'] === hash) {
        res.statusCode = 304
        res.end()
      } else {
        res.end(content)
      }
      return
    default:
      res.end('defaultdefaultdefault')
  }
})

server.listen(3000, () => {
  console.log('http serber listener', 3000)
})

