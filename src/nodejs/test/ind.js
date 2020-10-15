

console.clear()
function testTimer() {
  // 因为定时器函数是全局的，所以使用 API 不需要调用 require('timers')。
  console.log('time')
  /*
  Immediate 类   
        此对象在 setImmediate() 内部创建并返回。 它可以传给 clearImmediate() 以取消已安排的行动。
    immediate.hasRef()    如果为 true，则 Immediate 对象将会使 Node.js 事件循环保持活动状态。
    immediate.ref() immediate 的引用。  
          当被调用时，则只要 Immediate 处于活动状态，就会要求 Node.js 事件循环不要退出。
          默认情况下，所有的 Immediate 对象都是 ref 的，通常不需要调用 immediate.ref()，除非之前调用了 immediate.unref()。
    immediate.unref()

  Timeout 类  
      此对象在 setTimeout() 和 setInterval() 内部创建并返回。 它可以传给 clearTimeout() 或 clearInterval() 以取消已安排的行动。
      默认情况下，当使用 setTimeout() 或 setInterval() 安排一个定时器时，只要定时器处于活动状态，则 Node.js 事件循环就会继续运行。 这些函数返回的每个 Timeout 对象都会导出 timeout.ref() 和 timeout.unref() 函数，可用于控制此默认的行为。
  timeout.hasRef()
  timeout.ref()
  timeout.refresh()   将定时器的开始时间设置为当前时间，并重新安排定时器以便按之前指定的时长（以当前时间进行调整）调用其回调。
  timeout.unref()



    setImmediate(callback[, ...args])    没有时间，就是下一轮循环
        事件循环的此回合结束时要调用的函数  安排在 I/O 事件的回调之后立即执行的 callback。

    setInterval(callback, delay[, ...args])

    setTimeout(callback, delay[, ...args])
      callback 可能不会精确地在 delay 毫秒后被调用 。 Node.js 不保证回调被触发的确切时间，也不保证它们的顺序。 回调会在尽可能接近指定的时间被调用。
      当 delay 大于 2147483647 或小于 1 时，则 delay 将会被设置为 1。 非整数的 delay 会被截断为整数。
  */
  let num = 0
  setImmediate((...arg) => {
    console.log('setImmediate:', arg, num++)
  }, 1000, 2, 34)

  setInterval((...args) => {
    console.log('setInterval:', args, num++)
  }, 2000, 11112, 3, 4, 999, 5, 6)

  setTimeout((...args) => {
    console.log('setTimeout:', args, num++)
  }, 2000, 11112, 3, 4, 999, 5, 6)
}

function testTls() {
  /*
  tls 模块是对安全传输层（TLS）及安全套接层（SSL）协议的实现，建立在OpenSSL的基础上。 按如下方式引用此模块:
      const tls = require('tls');
    TLS/SSL 是公共/私人的密钥基础设施（PKI）。 大部分情况下，每个服务器和客户端都应该有一个私钥。

    openssl genrsa -out ryans-key.pem 2048    OpenSSL 的命令行来生成一个 2048 位的 RSA 私钥
    openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem     OpenSSL 能生成一个私钥的 CSR 文件：
  */
}
testTls()