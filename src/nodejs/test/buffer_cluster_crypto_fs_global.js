const assert = require('assert').strict
const child_process = require('child_process');
const cluster = require('cluster');
const http = require('http');
const os = require('os')
const crypto = require('crypto');
function log(msg, title = 'log') {
  console.log('-----------------------%s start---------------------------', title)
  console.log(msg)
  console.log('-----------------------%s end---------------------------', title)
}
function testAssert() {
  /*
  'fail',               'AssertionError',
  'ok',                 'equal',
  'notEqual',           'deepEqual',
  'notDeepEqual',       'deepStrictEqual',
  'notDeepStrictEqual', 'strictEqual',
  'notStrictEqual',     'throws',
  'rejects',            'doesNotThrow',
  'doesNotReject',      'ifError',
  'match',              'doesNotMatch',
  'strict'
*/

  try {
    assert.deepEqual([1], [1, 2])

  } catch (error) {
    log(error)

  }
}

function testBuffer() {
  // 创建buffer
  const b1 = Buffer.alloc(10, 'abcd', 'utf8')

  // 创建一个长度为 10、且未初始化的 Buffer。
  // 这个方法比调用 Buffer.alloc() 更快，
  // 但返回的 Buffer 实例可能包含旧数据，
  // 因此需要使用 fill()、write() 或其他能填充 Buffer 的内容的函数进行重写。
  const b2 = Buffer.allocUnsafe(10)
  // const b3 = Buffer.from([1, 2, 3])

  // from 的第二个参数是字符编码
  // utf8  utf16le  latin1  base64  hex
  const b3 = Buffer.from('xxss', 'utf8')
  const s = b3.toString('utf8')
  // for (const b of b3) {
  //   log(b)
  // }
  // alloc(size,fill,eccodeing)
  // fill :string buffer unit8Array integer

  // allocUnsafe(size)
  // 创建的buffer是未初始化的，可能包含敏感数据

  // alloc 不会使用  内存池   allocUnsafe在使用小于 poolSize一半时会使用内存池  所以后者更高效 但是存在旧的敏感数据

  // allocUnsafeSlow(size)  当开发人员需要在内存池中保留一小块内存时，可以使用 Buffer.allocUnsafeSlow() 创建一个非内存池的 Buffer 实例并拷贝相关的比特位出来。

  // Buffer.byteLength(b1)   
  // Buffer.compare(b1, b2)主要用于排序 
  // Buffer.concat([b1, b2, b3], 13)      第一个参数是bf列表  第二个参数值结果长度
  // Buffer.from(array)   0-255字节数组分配新buf 
  // Buffer.from(arrayBuffer[, byteOffset[, length]])
  // Buffer.isBuffer(obj)
  // Buffer.isEncoding(encoding)    如果 encoding 是支持的字符编码的名称，则返回 true，否则返回 false。
  // Buffer.poolSize 用于缓冲池的预分配的内部 Buffer 实例的大小（以字节为单位）。 该值可以修改。  默认值: 8192。
  // buf[index] 用于获取或设置 buf 中指定的 index 位置的八位字节。 该值指向单个字节，所以有效的值的范围是 0x00 至 0xFF（十六进制）、或 0 至 255（十进制）。
  // buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
  // buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
  // buf.entries()    返回一个可以使用for of  迭代的迭代器
  // buf.equals(otherBuffer)
  // buf.fill(value[, offset[, end]][, encoding])
  // buf.includes(value[, byteOffset][, encoding])
  // buf.indexOf(value[, byteOffset][, encoding])
  // buf.keys()
  // buf.lastIndexOf(value[, byteOffset][, encoding])
  // buf.length

  // buf.readBigInt64BE([offset]) 
  //    从 buf 中指定的 offset 读取一个有符号大端序的 64 位整数值。
  //    从 Buffer 中读取的整数值会被解析为二进制补码值。
  // buf.readBigInt64LE([offset])
  //    有符号小端序的 64 位整数值。
  // buf.readBigUInt64BE([offset])
  //      一个无符号大端序的 64 位整数值。
  // buf.readBigUInt64LE([offset])
  // buf.readDoubleBE([offset])
  //        读取一个 64 位的大端序双精度值。
  // buf.readDoubleLE([offset])
  // buf.readFloatBE([offset])
  // buf.readFloatLE([offset])
  // buf.readInt8([offset])
  // buf.readInt16BE([offset])
  // buf.readInt16LE([offset])
  // buf.readInt32BE([offset])
  // buf.readInt32LE([offset])
  // buf.readIntBE(offset, byteLength)
  // buf.readIntLE(offset, byteLength)
  // buf.readUInt8([offset])
  // buf.readUInt16BE([offset])
  // buf.readUInt16LE([offset])

  // buf.subarray([start[, end]])   修改新的 Buffer 切片将会修改原始 Buffer 中的内存，因为两个对象分配的内存是重叠的。
  // buf.slice([start[, end]])
  // buf.swap16() 将 buf 解析成无符号的 16 位整数的数组，并且以字节顺序原地进行交换
  //        32  64
  // buf.toJSON()   {"type":"Buffer","data":[1,2,3,4,5]}
  // buf.toString([encoding[, start[, end]]])
  // buf.values()
  // buf.write(string[, offset[, length]][, encoding])


  // buf.writeBigInt64BE(value[, offset])

  try {
    // log([b1,
    //   b2, b3, s,
    //   'poolSize:' + Buffer.poolSize,
    //   'byteLength:' + Buffer.byteLength(b1),
    //   'compare' + Buffer.compare(b1, b2),
    //   Buffer.concat([b1, b2, b3], 13),
    //   Buffer.isBuffer({}),
    //   Buffer.isEncoding('hex'),
    //   b1.byteOffset,
    //   b1.copy(b2)
    // ])
    for (const pair of b1.entries()
    ) {
      console.log(pair)
      console.log(b1.readBigInt64BE())
    }
  } catch (error) {
    console.log(error)
  }
  b1.write('小明')
  log([
    b1.swap16(),
    b1.toJSON(),
    Buffer.INSPECT_MAX_BYTES
  ])
}

function testChild_Process() {
  const { _forkChild,
    ChildProcess,
    exec,
    execFile,
    execFileSync,
    execSync,
    fork,
    spawn,
    spawnSync } = child_process
  // child_process.exec(command[, options][, callback])
  const bat = exec('ls', {
    timeout: 1000
  }, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行的错误: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

}
const logCallback = msg => (s) => console.log(msg + s)

function testcluster() {
  const processName = (cluster.isMaster ? '主进程' : "工作进程") + process.pid
  // 在worker中启动服务,会监听同一个端口
  // 主进程负责监听端口，接收新连接后再将连接循环分发给工作进程，在分发中使用了一些内置技巧防止工作进程任务过载。
  if (cluster.isMaster) {
    const cpus = os.cpus().length
    for (let i = 0; i < cpus; i++) {
      const worker = cluster.fork()
      workerLis(worker, '---------------')
      worker.send('--------主进程发来消息')
    }

    forceExit(processName, 2000)
    console.log(processName + '启动')

  } else {
    // forceExit(processName)
    console.log(processName + '启动')
    workerLis(cluster.worker, processName)
  }
  function forceExit(msg = '强行退出程序', time = 1000) {
    setTimeout(() => {
      if (cluster.isMaster) {
        const workers = cluster.workers
        Object.keys(workers).forEach(id => {
          const w = workers[id]
          // w.disconnect()
          w.kill()
        })
      } else {
        setTimeout(() => {
          throw new Error(msg)
        }, 1000)
      }


    }, time)
  }


  function workerLis(worker, processName) {
    processName = worker.id + processName + '当前在环境:cluster.isMaster=' + cluster.isMaster
    worker.on('message', logCallback(processName + ':message:'))
    worker.on('error', logCallback(processName + ':error:'))
    worker.on('exit', logCallback(processName + ':exit:'))
    worker.on('online', logCallback(processName + ':online:'))
    worker.on('disconnect', logCallback(processName + ':disconnect:'))
    process.on('message', (msg) => {
      console.log(processName + '接收到消息' + msg)
      process.send(processName + '回复消息')
    })
  }
}

function testCrypto() {
  const secret = 'abcdefg';
  const hash = crypto.createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
  console.log(hash);
}

function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
async function testFs() {
  const path = require('path')
  function resolve(str) {
    return path.join(__dirname, str)
  }
  const name = resolve('fsFile.css')
  const newName = resolve('xxxxx.xxxxx')
  const fs = require('fs')

  async function testRename() {
    fs.renameSync(name, newName)
    await sleep()
    fs.renameSync(newName, name)
  }
  function appenFile() {
    const dateStr = new Date().toLocaleDateString()
    fs.appendFileSync(newName, dateStr)

  }
  function readFile() {
    // 仅支持使用 file: 协议的 URL 对象。
    const f = new URL('http://111.231.200.44:8000/index.html')
    const str = fs.readFileSync(name)
    console.log(str.toString())
  }
  function openFile() {
    // 方法用于分配新的文件描述符。 一旦被分配，则文件描述符可用于从文件读取数据、向文件写入数据、或请求关于文件的信息。
    //   'appendFile',       'appendFileSync',    'access',
    // 'accessSync',       'chown',             'chownSync',
    // 'chmod',            'chmodSync',         'close',
    // 'closeSync',        'copyFile',          'copyFileSync',
    // 'createReadStream', 'createWriteStream', 'exists',
    // 'existsSync',       'fchown',            'fchownSync',
    // 'fchmod',           'fchmodSync',        'fdatasync',
    // 'fdatasyncSync',    'fstat',             'fstatSync',
    // 'fsync',            'fsyncSync',         'ftruncate',
    // 'ftruncateSync',    'futimes',           'futimesSync',
    // 'lchown',           'lchownSync',        'lchmod',
    // 'lchmodSync',       'link',              'linkSync',
    // 'lstat',            'lstatSync',         'mkdir',
    // 'mkdirSync',        'mkdtemp',           'mkdtempSync',
    // 'open',             'openSync',          'opendir',
    // 'opendirSync',      'readdir',           'readdirSync',
    // 'read',             'readSync',          'readv',
    // 'readvSync',        'readFile',          'readFileSync',
    // 'readlink',         'readlinkSync',      'realpath',
    // 'realpathSync',     'rename',            'renameSync',
    // 'rmdir',            'rmdirSync',         'stat',
    // 'statSync',         'symlink',           'symlinkSync',
    // 'truncate',         'truncateSync',      'unwatchFile',
    // 'unlink',           'unlinkSync',        'utimes',
    // 'utimesSync',       'watch',             'watchFile',
    // 'writeFile',        'writeFileSync',     'write',
    // 'writeSync',        'writev',            'writevSync',
    // 'Dir',              'Dirent',            'Stats',
    // 'ReadStream',       'WriteStream',       'FileReadStream',
    // 'FileWriteStream',  '_toUnixTimestamp',  'F_OK',
    // 'R_OK',             'W_OK',              'X_OK',
    // 'constants',        'promises'
    console.log(Object.keys(fs))
    const fd = fs.openSync(name, 'r')
    console.log(fd)
    const stats = fs.statSync(fd)
    console.log(stats)
  }
  async function openDir() {
    /*
      opendirSync  打开一个目录  如果使用 forawaitof遍历 会自动关闭  返回的是Dir对象
        Dir.readSync 读取下一个目录    返回 Dirent  name 是文件名
        Dir.path   raad的时候传递的一样  
        Dir.closeSync
           Dirent 目录项文件或者子目录 name 是文件名
          Dirent.isBlockDevice()    ?对象描述块设备，则返回 true。
                  isDirectory
                  isFIFO          先进先出（FIFO）管道
                  isFile()
                  isSocket()
                  isSymbolicLink( )
                  name          文件名
      readdirSync  返回一个字符串数组 options中的 withFileTypes true时 返回目录对象而非字符串数组
    */
    const fpath = '../../'
    const dir = fs.opendirSync(fpath)
    const dirs = fs.readdirSync(fpath, { withFileTypes: true })
    log(dirs)
    // for await (const d of dir) {
    //   console.log(d.name)
    // }
    let next = dir.readSync()
    while (next) {
      console.log('Dirent：%s\tisBlock:%s\tisCharacter:%s\tisDirectory:%s\tisFIFO:%s\tisFile:%s',
        next.name,
        next.isBlockDevice(),
        next.isCharacterDevice(),
        next.isDirectory(),
        next.isFIFO(),
        next.isFile(),
        next)
      next = dir.readSync()
    }
    dir.close((...e) => {
      console.log('close', e)
    })
  }
  async function watcher() {
    // 
    // change(eventType:string,filename:buffer|string)
    // close 当监视器停止监视更改时触发   fsWatch才有
    // error  


    // watcher.ref() 14.3新增 只要监听时激活的  就不退出进程  默认如此
    // watcher.unref()  

    // !fs.StatWatcher 类  监听文件返回的   没有close方法

    // const watch = fs.watch(name, (...e) => {
    const watch = fs.watchFile(name, (...e) => {
      console.log('change', e)
    })
    console.log(watch)

    setTimeout(() => {
      watch.close()
      console.log('停止监听')
    }, 5000)
  }
  async function readStream() {
    // fs.ReadStream 类
    // close open ready
    // bytesRead    到目前为止已读取的字节数。
    // path
    // pending    如果底层的文件还未被打开（ 'ready' 事件之前），则此属性为 true。
    // fs.unlinkSync(newName)

    const readSream = fs.createReadStream(name)
    readSream.close()

    const writeStream = fs.createWriteStream(newName)
    readSream.pipe(writeStream)



    /**
     * 
     *  createReadStream
          path <string> | <Buffer> | <URL>
            options <string> | <Object>
                flags <string> 参见文件系统 flag 的支持。 默认值: 'r'。
                encoding <string> 默认值: null。
                fd <integer> 默认值: null。
                mode <integer> 默认值: 0o666。
                autoClose <boolean> 默认值: true。
                emitClose <boolean> 默认值: false。
                start <integer>
                end <integer> 默认值: Infinity。
                highWaterMark <integer> 默认值: 64 * 1024。
                fs <Object> | <null> 默认值: null。
      ------------
      start 和 end 值，用于从文件中读取一定范围的字节，而不是读取整个文件。 并且从 0 开始
      如果指定了 fd，则 ReadStream 会忽略 path 参数，并且会使用指定的文件描述符。 这意味着不会触发 'open' 事件。 fd 必须是阻塞的，非阻塞的 fd 应该传给 net.Socket。
      默认情况下，流被销毁之后不会触发 'close' 事件。 这与其他 Readable 流的默认设置是相反的。 设置 emitClose 选项为 true 可以更改此行为。


      fs.createWriteStream(path[, options])
              path <string> | <Buffer> | <URL>
                      options <string> | <Object>
                      flags <string> 参见文件系统 flag 的支持。 默认值: 'w'。
                      encoding <string> 默认值: 'utf8'。
                      fd <integer> 默认值: null。
                      mode <integer> 默认值: 0o666。
                      autoClose <boolean> 默认值: true。
                      emitClose <boolean> 默认值: false。
                      start <integer>
                      fs <Object> | <null> 默认值: null。

     */

  }
  function stat() {
    // fs.Stats 类
    /*
    stats.isBlockDevice()
    stats.isCharacterDevice()
    stats.isDirectory()
    stats.isFIFO()
    stats.isFile()
    stats.isSocket()
    stats.isSymbolicLink()
    stats.dev
    stats.ino
    stats.mode
    stats.nlink 硬件连接数
    stats.uid
    stats.gid
    stats.rdev
    stats.size
    stats.blksize
    stats.blocks
    stats.atimeMs
    stats.mtimeMs
    stats.ctimeMs
    stats.birthtimeMs
    stats.atimeNs
    stats.mtimeNs
    stats.ctimeNs
    stats.birthtimeNs
    stats.atime
    stats.mtime
    stats.ctime
    。。。
    */
    const st = fs.statSync(name)
    console.log(st)
  }
  function access() {
    // 用于查看各种权限   文件存在  文件可读性 文件可编辑性 如果返回值不为undefine或null  就说明没有对应权限
    // 不要在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查文件的可访问性。 这样做会引入竞态条件，因为其他进程可能会在两个调用之间更改文件的状态。 而是，应该直接打开、读取或写入文件，并且当文件无法访问时处理引发的错误。
    // fs.access(path[, mode], callback)
    const ac = fs.accessSync(name)
    console.log(ac)
    // 检查文件是否存在于当前目录中。
    // fs.access(file, fs.constants.F_OK, (err) => {
    //   console.log(`${file} ${err ? '不存在' : '存在'}`);
    // });

    // // 检查文件是否可读。
    // fs.access(file, fs.constants.R_OK, (err) => {
    //   console.log(`${file} ${err ? '不可读' : '可读'}`);
    // });

    // // 检查文件是否可写。
    // fs.access(file, fs.constants.W_OK, (err) => {
    //   console.log(`${file} ${err ? '不可写' : '可写'}`);
    // });

    // // 检查文件是否存在于当前目录中、以及是否可写。
    // fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    //   if (err) {
    //     console.error(
    //       `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
    //   } else {
    //     console.log(`${file} 存在，且可写`);
    //   }
    // });
  }
  function appendFileChmod() {
    // 追加数据到文件，如果文件尚不存在则创建文件。
    // fs.appendFile(path, data[, options], callback)
    //      path <string> | <Buffer> | <URL> | <number> 文件名或文件描述符。
    //      data <string> | <Buffer>
    //      options <Object> | <string>
    //          encoding <string> | <null> 默认值: 'utf8'。
    //          mode <integer> 默认值: 0o666。
    //          flag <string> 参见文件系统 flag 的支持。默认值: 'a'。

    // 更改文件的权限。 除了可能的异常，完成回调没有其他参数。
    // fs.chmod(path, mode, callback)
    //                       常量    八进制值	    说明
    //      fs.constants.S_IRUSR    0o400       所有者可读
    //      fs.constants.S_IWUSR    0o200       所有者可写
    //      fs.constants.S_IXUSR    0o100       所有者可执行或搜索
    //      fs.constants.S_IRGRP    0o40        群组可读
    //      fs.constants.S_IWGRP    0o20        群组可写
    //      fs.constants.S_IXGRP    0o10        群组可执行或搜索
    //      fs.constants.S_IROTH    0o4	        其他人可读
    //      fs.constants.S_IWOTH    0o2	        其他人可写
    //      fs.constants.S_IXOTH    0o1	        其他人可执行或搜索


    // fs.chown(path, uid, gid, callback)
    // path <string> | <Buffer> | <URL>
    //     uid <integer>
    //     gid <integer>
    //     callback <Function>
    //     err <Error></Error>

    // fs.close(fd, callback)


    // fs.constants   返回包含文件系统操作常用常量的对象。 当前定义的特定常量在 FS 常量中描述。

    // 默认情况下，如果 dest 已经存在，则覆盖它。
    // 如果在打开目标文件用于写入后发生错误，则 Node.js 将尝试删除目标文件。
    // mode 是一个可选的整数，指定拷贝操作的行为。
    // fs.copyFile(src, dest[, mode], callback)

    fs.copyFileSync(name, newName)
  }

  async function aboutLink() {
    // fs.link(existingPath, newPath, callback)
    const n = resolve('xiaomi.coxxxxm')
    debugger
    // const s = fs.linkSync(resolve('../../../src/miniVue'), n)
    // console.log(s)



    // fs.mkdirSync(resolve('./xiaomi/da/t/./a/xixx'), {
    //   recursive: true
    // })
    // fs.lstat(path[, options], callback)


    // fs.mkdir(path[, options], callback)
    /**
            path <string> | <Buffer> | <URL>
            options <Object> | <integer>
              recursive <boolean> 默认值: false。
              mode <string> | <integer> 在 Windows 上不支持。默认值: 0o777。
              callback <Function>
              err <Error> 
    */

    //  fs.mkdtemp(prefix[, options], callback)
    // 会在指定位置创建一个目录  带着随机字符串
    // fs.mkdtemp(resolve('目录-'), (err, directory) => {
    //   // fs.mkdtemp(path.join(os.tmpdir(), '目录-'), (err, directory) => {
    //   if (err) throw err;
    //   console.log(directory);

    // 打印: /tmp/目录-itXde2 或 C:\Users\...\AppData\Local\Temp\目录-itXde2
    // });

    // fs.open(path[, flags[, mode]], callback)
    // fs.opendir(path[, options], callback)
    // fs.read(fd, buffer, offset, length, position, callback)
    // let s = fs.readFileSync(name)
    // let s = fs.readdirSync('/')
    // let s = fs.realpathSync.native('./')
    // fs.rename(oldPath, newPath, callback)
    // fs.rmdir(path[, options], callback)
    // fs.stat(path[, options], callback)
    // fs.symlink(target, path[, type], callback)
    // fs.truncate(path[, len], callback)

    let s = fs.realpathSync('./')
    console.log(s.toString())
    let t = fs.truncateSync(name)
    console.log(t)
    // fs.unlink(path, callback)
    // fs.unwatchFile(filename[, listener])停止监视 filename 的变化。 如果指定了 listener，则仅移除此特定监听器，否则，将移除所有监听器，从而停止监视 filename。

    // fs.utimes(path, atime, mtime, callback)

  }
  function anoutWatch() {

    // fs.watch(filename[, options][, listener])
    /*
    filename <string> | <Buffer> | <URL>
        options <string> | <Object>
        persistent <boolean> 指示如果文件已正被监视，进程是否应继续运行。默认值: true。
        recursive <boolean> 指示应该监视所有子目录，还是仅监视当前目录。这适用于监视目录时，并且仅适用于受支持的平台（参见注意事项）。默认值: false。
        encoding <string> 指定用于传给监听器的文件名的字符编码。默认值: 'utf8'。
        listener <Function> | <undefined> 默认值: undefined。
        eventType <string>
        filename <string> | <Buffer>
        返回: <fs.FSWatcher>
    
    */


    // fs.watchFile(filename[, options], listener)

    // fs.watchFile('message.text', (curr, prev) => {
    //   console.log(`当前的最近修改时间是: ${curr.mtime}`);
    //   console.log(`之前的最近修改时间是: ${prev.mtime}`);
    // });

    // fs.write(fd, buffer[, offset[, length[, position]]], callback)
    // fs.writeFile(file, data[, options], callback)
  }


  // fs.promises API 提供了一组备用的异步文件系统的方法，它们返回 Promise 对象而不是使用回调。 API 可通过 require('fs').promises 或 require('fs/promises') 访问
  console.clear()
  anoutWatch()

}


function testGlobal() {
  console.log('__dirname', __dirname)
  console.log('__filename', __filename)
  // Buffer             用于处理二进制数据。
  // __dirname          此变量虽然看似全局的，但实际上不是
  // __filename         此变量虽然看似全局的，但实际上不是
  // clearImmediate
  // clearInterval
  // clearTimeout
  // console
  // exports            此变量虽然看似全局的，但实际上不是
  // global
  // module             此变量虽然看似全局的，但实际上不是
  // process
  // queueMicrotask     将微任务放入队列以便调用 callback。
  //                    微任务队列由 V8 进行管理，可以通过与 process.nextTick() 队列（由 Node.js 管理）类似的方式进行使用。
  // require            此变量虽然看似全局的，但实际上不是
  // setImmediate
  // setInterval
  // setTimeout
  // TextDecoder
  // URL
  // URLSearchParams
  // WebAssembly
  console.log(global)
}

testGlobal()



