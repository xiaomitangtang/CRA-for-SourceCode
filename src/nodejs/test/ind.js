console.clear()





function netTest() {
  const net = require('net')
  const netKeys = () => {
    /*
   '_createServerHandle',
    '_normalizeArgs',
    '_setSimultaneousAccepts',
    'connect',
    'createConnection',
    'createServer',
    'isIP',
    'isIPv4',
    'isIPv6',
    'Server',
    'Socket',
    'Stream'


*/
  }
  function server() {
    // new net.Server([options][, connectionListener])
    /*
    'close' 事件    
          当 server 关闭的时候触发。 如果有连接存在，直到所有的连接结束才会触发这个事件。
    'connection' 事件
          当一个新的连接建立的时候触发。 socket 是一个 net.Socket 实例
    'error' 事件
          当错误出现的时候触发。 不同于 net.Socket，'close' 事件不会在这个事件触发后继续触发，除非 server.close() 是手动调用
    'listening' 事件
          当调用 server.listen() 绑定服务器之后触发。
    server.address()

    */

    // 不知道这个咋用的
    // const s = new net.Server((socket) => {
    // })
    // s.listen(() => {
    //   console.log('服务器打开了', s.address())
    // })


    /*
    server.close([callback])
    server.getConnections(callback) 异步获取服务器的当前并发连接数。当 socket 被传递给子进程时工作。
    server.listen()

    server.listening      <boolean> 表明 server 是否正在监听连接。
    server.maxConnections 设置该属性使得当 server 连接数过多时拒绝连接
    server.ref()  在一个已经调用 unref 的 server 中调用 ref()，如果 server 是仅存的 server，则程序不会退出（默认）
    server.unref()
    

    net.Socket 类



    */
    const ser = net.createServer(socket => {
      socket.send('xiaomi')
    })
    ser.listen(8001, () => {
      // 在 'listening' 事件被触发之前、或在调用 server.close() 之后， server.address() 返回 null。
      console.log(ser.address())
      ser.getConnections(console.log)
    })
  }

  server()
}

function testOs() {
  const os = require('os')
  /*
  os.EOL           操作系统的行末标志  window \r\n  posix \n
  os.arch()       返回为其编译 Node.js 二进制文件的操作系统的 CPU 架构。  x64
  os.constants    包含错误码、进程信号等常用的操作系统特定的常量。 
  os.cpus()       返回一个对象数组，其中包含有关每个逻辑 CPU 内核的信息。
      nice 的值仅适用于 POSIX。 在 Windows 上，所有处理器的 nice 值始终为 0。
    model <string>
        speed <number> 以兆赫兹为单位。
        times <Object>
              user <number> CPU 在用户模式下花费的毫秒数。
              nice <number> CPU 在良好模式下花费的毫秒数。
              sys <number> CPU 在系统模式下花费的毫秒数。
              idle <number> CPU 在空闲模式下花费的毫秒数。
              irq <number> CPU 在中断请求模式下花费的毫秒数。

  os.endianness()   返回一个字符串，该字符串标识为其编译 Node.js 二进制文件的 CPU 的字节序。    
                    可能的值有， 'BE' 用于大端字节序， 'LE' 用于小端字节序。
  os.freemem()      以整数的形式返回空闲的系统内存量（以字节为单位）。
  os.getPriority([pid]) pid 指定的进程的调度优先级。 如果未提供 pid 或者为 0，则返回当前进程的优先级。
  os.homedir()  当前用户的主目录的字符串路径。
  os.hostname() 以字符串的形式返回操作系统的主机名。
   os.loadavg()   返回一个数组，包含 1、5 和 15 分钟的平均负载。
                平均负载是 UNIX 特定的概念。 在 Windows 上，其返回值始终为 [0, 0, 0]。
  os.networkInterfaces()  返回一个对象，该对象包含已分配了网络地址的网络接口。
  os.platform() 返回标识操作系统平台的字符串。 该值在编译时设置。 可能的值有 'aix'、 'darwin'、 'freebsd'、 'linux'、 'openbsd'、 'sunos' 和 'win32'。
  os.release()  以字符串的形式返回操作系统。


    os.setPriority([pid, ]priority)
        pid <integer> 为其设置调度优先级的进程 ID。默认值 0。
        priority <integer> 分配给进程的调度优先级。
  os.tmpdir() 以字符串的形式返回操作系统的默认临时文件目录
  os.totalmem() 以整数的形式返回系统的内存总量（以字节为单位）。
  os.type() 返回与 uname(3) 返回一样的操作系统名字。 
            例如，在 Linux 上返回 'Linux'，
            在 macOS 上返回 'Darwin'，
            在 Windows 上返回 'Windows_NT'。
  os.uptime() 返回系统的正常运行时间（以秒为单位）。
  os.userInfo([options])  返回关于当前有效用户的信息。
  os.version() 返回内核版本
  */
  console.log(os.version())
}
function testPath() {
  const path = require('path')
  const f = __filename
  /*
    如果要在任意操作系统上使用 Windows 文件路径时获得一致的结果，则使用 path.win32：
    如果要在任意操作系统上使用 POSIX 文件路径时获得一致的结果，则使用 path.posix：
  
    path.basename() 方法会返回 path 的最后一部分，类似于 Unix 的 basename 命令。 尾部的目录分隔符会被忽略
    path.dirname(path)
    path.extname(path)
    path.format(pathObject)
            pathObject <Object>
              dir <string>
              root <string>
              base <string>
              name <string>
              ext <string>
    path.delimiter  提供平台特定的路径定界符
                  ; 用于 Windows
                  : 用于 POSIX
  path.isAbsolute(path)
  path.join([...paths])   将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的
  路径。  如果连接后的路径字符串为长度为零的字符串，则返回 '.'，表示当前工作目录。
  path.normalize(path)    只接受一个字符串路径

  path.parse(path)


    path.posix    属性提供对 path 方法的 POSIX 特定实现的访问。
    path.win32    提供对特定于 Windows 的 path 方法的实现的访问。

    path.relative(from, to) 法根据当前工作目录返回 from 到 to 的相对路径
    path.resolve([...paths])    将路径或路径片段的序列解析为绝对路径

    path.sep  提供平台特定的路径片段分隔符：
              Windows 上是 \。
              POSIX 上是 /。
    path.toNamespacedPath(path)
  */
  console.log(path.parse(f))
  console.log('basename:\t', path.basename(f))
  console.log('dirname:\t', path.dirname(f))
  console.log('extname:\t', path.extname(f))
  console.log('isAbsolute:\t', path.isAbsolute(f))
  // console.log('posix:\t', path.posix)
  console.log(path.delimiter)
  console.log(path.join('/目录1', '目录2', '目录3/目录4', '目录5', '..'))
  console.log(path.normalize('/目录1', '目录2', '目录3/目录4', '目录5', '..'))
  console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'))
}


function testProcess() {
  console.log(process)
  process.on('beforeExit', (code) => {
    console.log('进程 beforeExit 事件的代码: ', code);
  });
  process.on('exit', (code) => {
    console.log('进程 exit 事件的代码: ', code);
  });
  /*
    'disconnect' 事件
    'exit' 事件
    'message' 事件
    'multipleResolves' 事件
        只要 Promise 有以下情况，就会触发 'multipleResolves' 事件：
        resolve不止一次。
        reject不止一次。
        resolve后reject。
        reject后resolve。
    'rejectionHandled' 事件
    ....



    process.abort() 使 Node.js 进程立即结束，并生成一个核心文件。
    process.arch
    process.argv     属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
    process.argv0   保存当 Node.js 启动时传入的 argv[0] 的原始值的只读副本。 

    process.channel
              如果 Node.js 进程是由 IPC 通道（参见子进程文档）方式创建的， process.channel 属性保存 IPC 通道的引用。 
              如果 IPC 通道不存在，则此属性值为 undefined。
    process.channel.ref()     保持事件循环的意思，和其他地方一样，
    process.channel.unref()
    process.chdir(directory)      process.chdir() 方法变更 Node.js 进程的当前工作目录，如果变更目录失败会抛出异常（例如，如果指定的 directory 不存在）。
  */
  console.log('此消息最新显示');


  console.log(process.chdir(__dirname))
  process.on('multipleResolves', (type, promise, reason) => {
    console.error(type, promise, reason);
    setImmediate(() => process.exit(1));
  });

  async function main() {
    try {
      return await new Promise((resolve, reject) => {
        resolve('第一次调用');
        resolve('吞没解决');
        reject(new Error('吞没解决'));
      });
    } catch {
      throw new Error('失败');
    }
  }

  main().then(console.log);
}
function testProcess2() {
  /*
    process.config
    process.connected
    process.cpuUsage([previousValue])
    process.cwd()  方法会返回 Node.js 进程的当前工作目录。
    process.debugPort
    process.disconnect()
    process.dlopen(module, filename[, flags])

    process.env
    process.execArgv
    process.execPath  返回启动 Node.js 进程的可执行文件的绝对路径名。
    process.exit([code])
    process.exitCode
    process.getegid()
    process.geteuid()\
    process.kill(pid[, signal])
    process.nextTick(callback[, ...args]) 将 callback 添加到下一个时间点的队列。
    process.noDeprecation 表明是否在当前 Node.js 进程上设置了 --no-deprecation 标志
    process.pid
    process.platform
    process.ppid
    process.release   前发布相关的元数据 Object，包括源代码和源代码头文件 tarball 的 URL。
    process.report
    process.resourceUsage()
    process.send(message[, sendHandle[, options]][, callback])
    process.stderr
    process.stdout
    process.title  process.title 分配新值会修改 ps 的当前值。
  */
  // console.log(process.resourceUsage())
  // console.log('开始');
  // process.nextTick(() => {
  //   console.log('下一个时间点的回调');
  // });
  // console.log('调度');
  // const now = Date.now();
  // while (Date.now() - now < 3000);
  // console.log(process.cpuUsage())
  console.log(process.title)
  const readline = require('readline')
  const rc = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rc.on('line', line => {
    console.log('您输入的文字为:', line)
    process.title = line
  })
}

function testQs() {
  const querystring = require('querystring');
  /*
  querystring.decode()      querystring.parse() 的别名。
  querystring.encode()      querystring.stringify() 的别名。
  querystring.escape(str)

  querystring.parse(str[, sep[, eq[, options]]])
      str <string> 要解析的 URL 查询字符串。
      sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
      eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
      options <Object>
            decodeURIComponent <Function> 当解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
            maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
  querystring.stringify(obj[, sep[, eq[, options]]])
  querystring.unescape(str)
  */
  // 不能对象套数组套对象  会出错    数组不能嵌套对象 对象也不能套对象
  let obj = {
    a: 1, b: 2, c: [1, 2, 3, 4, { aaa: 2 }]
  }
  obj = { a: { x: 1 } }
  console.log(querystring.stringify(obj))
}

function testReadLine() {
  const readline = require('readline');
  function t1() {
    // 旦调用此代码，Node.js 应用程序将不会终止，直到 readline.Interface 关闭，因为接口在 input 流上等待接收数据。
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('你如何看待 Node.js 中文网？', (answer) => {
      // TODO：将答案记录在数据库中。
      console.log(`感谢您的宝贵意见：${answer}`);
      rl.write('删除这个！');
      rl.close();
    });

    /*
    'close' 事件
    'line' 事件
    'pause' 事件
    'resume' 事件   每当 input 流恢复时，就会触发 'resume' 事件。
    'SIGCONT' 事件  当先前使用 <ctrl>-Z（即 SIGTSTP）移入后台的 Node.js 进程使用 fg(1p) 返回到前台时，就会触发 'SIGCONT' 事件。
    'SIGINT' 事件 每当 input 流接收到 <ctrl>-C 输入（通常称为 SIGINT）时，就会触发 'SIGINT' 事件。
    'SIGTSTP' 事件  每当 input 流接收到 <ctrl>-Z 输入（通常称为 SIGTSTP）时，就会触发 'SIGTSTP' 事件。


    rl.close()
    rl.pause()
    rl.prompt([preserveCursor])
    rl.question(query, callback)
    rl.resume()
    rl.setPrompt(prompt)
    rl.write(data[, key])
    rl[Symbol.asyncIterator]()

    rl.line
    rl.cursor
    rl.getCursorPos()
    readline.clearLine(stream, dir[, callback])
    readline.clearScreenDown(stream[, callback])
    readline.createInterface(options)
    readline.cursorTo(stream, x[, y][, callback])
    readline.emitKeypressEvents(stream[, interface])
    readline.moveCursor(stream, dx, dy[, callback])
    */
  }
  t1()
}


function testRepl() {
  // repl 模块提供了一种“读取-求值-输出”循环（REPL）的实现，它可作为一个独立的程序或嵌入到其他应用中。 
  const repl = require('repl');
}
testRepl()











