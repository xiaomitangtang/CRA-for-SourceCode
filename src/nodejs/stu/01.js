let clear = null
try {
  clear = require('clear')
} catch (error) {
  clear = () => console.clear()
}

function bf() {
  clear()
  const b1 = Buffer.alloc(10, 1)
  const b2 = Buffer.from([2, 1])  //0 – 255 范围内的字节数组//
  const b3 = Buffer.from('xyz001')
  const b = Buffer.concat([b1, b2, b3])
  const b2c = Buffer.from(b2)
  // const b1c=b1.copy()
  b1[0] = 233
  b1.write('xyz', 2)
  console.log(b1)
  // console.log(b2)
  // console.log(b3)
  // console.log(b)
  // console.log(Buffer.byteLength('在家', 'utf8'))
  // console.log(Buffer.compare(b1, b2))

  console.log(b2 === b2c)
  console.log(b1.constants)
}
function cp() {
  clear()
  // 
  const { spawn, exec, fork } = require('child_process');
  const ls = spawn('pwd');

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
  });
  ls.on('exit', (code) => {
    console.log(`子进程使用代码 ${code} 退出`);
  });

  ls.stdout.pipe(process.stdout)
  ls.stderr.pipe(process.stderr)


  const c = fork('/test/02.js')
  c.on('message', (d) => {
    console.log(d)
  })
  c.send('wo shi zhujia')


  // exec
  // exec('error', {
  //   cwd: '/test'
  // }, (err, stdout, stderr) => {

  //   console.log({
  //     stdout, stderr
  //   })
  // })

}
// bf()

// cp()


function crp() {
  clear()
  const crypto = require('crypto')
  const fs = require('fs')
  function c(...msgs) {
    const hash = crypto.createHash('sha256')
    msgs.forEach(m => {
      hash.update(m)
    })
    return hash.digest('hex')
  }
  console.log('-------------crp-----------------')
  const secret = 'xxx加密字段'
  // const hash = crypto.createHmac('sha256', secret)
  // const input = fs.createReadStream('./02.js');
  // input.pipe(hash).setEncoding('hex').pipe(process.stdout);
  console.log(c('1,2'))
  console.log(c('1,2', '2,3'))
  console.log(c('1,22,3'))
  console.log((c('2,3')))

  // Certificate  用于处理 SPKAC 数据。

  // Cipher 类的实例用于加密数据
  // console.log(crypto.getCiphers())

}

function ev() {
  clear()
  const EventEmitter = require('events');

  class MyEmitter extends EventEmitter { }
  const myEmitter = new MyEmitter();
  myEmitter.once('newListener', (event, listener) => {
    if (event === 'event') {
      // 在前面插入一个新的监听器。
      myEmitter.on('event', () => {
        console.log('B');
      });
    }
  });
  myEmitter.on('event', function (...args) {
    // !添加 listener 函数到名为 eventName 的事件的监听器数组的末尾。 不会检查 listener 是否已被添加。 多次调用并传入相同的 eventName 与 listener 会导致 listener 会被添加多次。
    console.log('触发事件', args, this === myEmitter);
  });
  myEmitter.on('event', function (...args) {
    console.log('触发事件2', args, this === myEmitter);
  });
  myEmitter.once('event', (...args) => {
    console.log('只触发一次的事件', args)
  })
  myEmitter.emit('event', 1, 2, 3);
  myEmitter.emit('event', 3);
  // myEmitter.emit('error', new Error('错误信息'));
  console.log(myEmitter.listenerCount('event'))
  console.log(myEmitter.listeners('event'))
  console.log(myEmitter.eventNames())
  // defaultMaxListeners  默认情况下，每个事件可以注册最多 10 个监听器。
}
// crp()
// ev()



async function ff() {
  clear()
  const fs = require('fs')
  const path = require('path')
  const name = path.join(__dirname, './xxxxs')
  // fs.mkdirSync(name)
  // const stat = fs.statSync(name)
  // const stat = fs.accessSync(name)
  const stat = fs.existsSync(name)
  console.log(stat)

  // setTimeout(() => {
  //   fs.unlinkSync('./xxxx')
  // }, 1000)

}


async function htttp() {
  clear()
  const http = require('http')
  const net = require('net')
  const sv = http.createServer((req, res) => {
    // console.log(req.rawHeaders)
    // let i = 0
    // res.statusCode = 200
    // let timeid = setInterval(() => {
    //   i++
    //   if (i < 5) {
    //     res.write(i + '')
    //   } else {
    //     res.end(i + '')
    //     clearInterval(timeid)
    //   }

    // }, 1000)

  })
  sv.on('connect', (req, clientSocket, head) => {
    console.log('我呗链接了')
    const { port, hostname } = new URL(`http://${req.url}`);
    const serverSocket = net.connect(port || 80, hostname, () => {
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
        'Proxy-agent: Node.js-Proxy\r\n' +
        '\r\n');
      serverSocket.write(head);
      serverSocket.pipe(clientSocket);
      clientSocket.pipe(serverSocket);
    });
  })
  sv.listen(3000, () => {
    // const options = {
    //   port: 3000,
    //   host: '127.0.0.1',
    //   method: 'CONNECT',
    //   path: 'nodejs.cn:80'
    // };

    // const req = http.request(options);
    // req.end();
    // req.on('connect', (res, socket, head) => {
    //   console.log('已连接');

    //   // 通过 HTTP 隧道发出请求。
    //   socket.write('GET / HTTP/1.1\r\n' +
    //     'Host: nodejs.cn:80\r\n' +
    //     'Connection: close\r\n' +
    //     '\r\n');
    //   socket.on('data', (chunk) => {
    //     console.log(chunk.toString());
    //   });
    //   socket.on('end', () => {
    //     sv.close();
    //   });
    // });

  })
  // http.get({
  //   // 'http://111.231.200.44:300'

  //   host: '111.231.200.44', port: 3000
  // }, res => {
  //   console.log(res)
  // })

  console.log(http.globalAgent)
}
// ff()
// htttp()



function nnnet() {
  clear()
  const net = require('net');
}

// nnnet()


function sockt() {
  const fs = require('fs')
  const http = require('http')
  const socketIo = require('socket.io')
  const express = require('express')
  const app = express()
  const ht = http.Server(app)
  const io = socketIo(ht)
  const url = require('url')
  console.log(url)
  app.get('/', (req, res) => {
    fs.createReadStream('./index.html').pipe(res)
  })

  io.on('connection', socket => {
    console.log('a use connect')
    socket.on('chat message', msg => {
      console.log(msg)
      io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  })
  ht.listen(3000)

}

function fup() {
  clear()
  const express = require('express')
  const fileUpload = require('express-fileupload')
  const path = require('path')
  const md5 = require('md5');
  const fs = require('fs')
  const bodyParser = require('body-parser')
  const app = express()
  app.use('/assert', express.static('./assert'))
  app.use(fileUpload())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use('/upload', (req, res) => {
    let file = req.files.file;
    let body = req.body;
    let { chunk, chunks } = body;
    let filePath = path.resolve(__dirname, `./upload/${req.body.guid}`);
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    console.log({
      file, chunk, chunks
    })

    file.mv(path.resolve(filePath, `./${chunk}.part`), function (err) {
      let done = true;
      if (err)
        return res.status(500).send(err);
      for (let i = 0; i < chunks; i++) {
        if (!fs.existsSync(path.resolve(filePath, `./${i}.part`))) {
          done = false;
          break;
        }
      }
      if (done === true) {
        res.json({ flag: true, chunked: true, hasError: false, ext: path.extname(file.name), chunks });
      } else {
        res.json({
          flag: true, chunked: false, hasError: false
        })
      }
    });
  })
  app.post('/merge', (req, res) => {
    const body = req.body;
    const { guid, chunks, ext } = body;
    let md = md5(`${guid}${new Date().toString()}${chunks}`);
    let basePath = path.resolve(__dirname, `./upload/${guid}`);
    let filePh = path.resolve(__dirname, `./upload/${md}${ext}`)
    for (let i = 0; i < chunks; i++) {
      try {
        fs.appendFileSync(filePh, fs.readFileSync(path.resolve(basePath, `./${i}.part`)));
      } catch (e) {
        return req.json({ flag: 0 })
      }
    }
    return res.json({ flag: 1 })

  })

  app.listen(3000)
}
// sockt()

// fup()


function tkoa() {
  const Koa = require('./miniKoa')
  const app = new Koa()
  app.use(async (ctx, next) => {
    console.log(ctx)
    console.log('1111 start')
    ctx.body = 'nihao  koa'
    const d = await next()
    console.log(d)
    console.log('1111 end')
  })
  app.use(async (ctx, next) => {
    console.log('2222 start')
    await next()
    ctx.body = 'nihao  koaxxx'
    console.log('2222 end')
  })
  app.listen(3000)

}

tkoa()