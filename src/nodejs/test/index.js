// http
console.clear()

function testHttp() {
  const http = require('http')

  // '_connectionListener',
  // 'METHODS',
  // 'STATUS_CODES',
  // 'Agent',
  // 'ClientRequest',
  // 'IncomingMessage',
  // 'OutgoingMessage',
  // 'Server',
  // 'ServerResponse',
  // 'createServer',
  // 'get',
  // 'request',
  // 'maxHeaderSize',
  // 'globalAgent'
  // console.log(Object.keys(http))
  function Agent() {
    //   new Agent([options])
    /*
            keepAlive <boolean> 即使没有未完成的请求，也要保持套接字
            keepAliveMsecs <number> 当使用 keepAlive 选项时，指定用于 TCP Keep-Alive 数据包的初始延迟。
            maxSockets <number> 每个主机允许的套接字的最大数量。
            maxTotalSockets     总数
            maxFreeSockets <number> 在空闲状态下保持打开的套接字的最大数量。
            scheduling           It can be 'fifo' or 'lifo'
            timeout <number> 套接字的超时时间 以毫秒为单位
    */
    const keepAliveAgent = new http.Agent({ keepAlive: true });
    console.log(keepAliveAgent)
    //       agent.createConnection(options[, callback])
    //      agent.keepSocketAlive(socket)
    //      agent.reuseSocket(socket, request)
    //      agent.destroy()
    //      agent.freeSockets
    //      agent.getName(options)
    //      agent.maxFreeSockets
    //      agent.maxSockets
    //      agent.maxTotalSockets
    //      agent.requests
    //      agent.sockets



  }
  function Request() {
    /*
     http.ClientRequest 类

       'abort' 事件        当请求被客户端中止时触发。 此事件仅在第一次调用 abort() 时触发。
       'connect' 事件      每次服务器使用 CONNECT 方法响应请求时都会触发。 如果未监听此事件，则接收 CONNECT 方法的客户端将关闭其连接。
       'continue' 事件  当服务器发送 100 Continue HTTP 响应时触发，通常是因为请求包含 Expect: 100-continue。 
       'information' 事件   服务器发送 1xx 中间响应（不包括 101 Upgrade）时触发。 此事件的监听器将会接收一个对象，该对象包含 HTTP 版本，状态码，状态消息，键值对请求头对象、以及具有原始请求头名称和值的数组。
       'response' 事件
       'socket' 事件
       'timeout' 事件
       'upgrade' 事件
   */
    const proxy = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('响应内容');
    })

    proxy.listen(8001, e => {
      console.log('list:8001', e)
    })
    /*
    request.abort()     改为使用 request.destroy() 。     将请求标记为中止。 调用此方法将导致响应中剩余的数据被丢弃并且套接字被销毁。
    request.aborted     如果请求已中止，则 request.aborted 属性将会为 true。
    request.connection    弃用. 改为使用 request.socket.
    
    */
    setTimeout(() => {
      http.get({
        hostname: 'localhost',
        port: 8001,
        path: '/',
        agent: false  // 仅为此一个请求创建一个新代理。
      }, (res) => {
        // 用响应做些事情。
        console.log(res)
      });
    }, 2000)
  }
  Request()
}


testHttp()