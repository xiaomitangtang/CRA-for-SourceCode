console.clear()
function testUtil() {
  const util = require('util')

  /*
    !util.callbackify(original)
      将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数，
    !util.promisify(original)
      一个遵循常见的错误优先的回调风格的函数（即以 (err, value) => ... 回调作为最后一个参数），并返回一个返回 promise 的版本。
    !util.debuglog(section[, callback])
      方法用于创建一个函数，基于 NODE_DEBUG 环境变量的存在与否有条件地写入调试信息到 stderr
      如果 section 名称在环境变量的值中，则返回的函数类似于 console.error()。 否则，返回的函数是一个空操作。
        debuglog().enabled   与上面相同，只是这个变量可以用于进行条件判断
    !util.debug(section) Alias for util.debuglog

    !util.deprecate(fn, msg[, code])
          fn <Function> 要被弃用的函数。
          msg <string> 当调用弃用的函数时显示的警告消息。
          code <string> 弃用码。 有关代码列表，请参见弃用的 API 列。
        以一种标记为已弃用的方式包装 fn（可以是函数或类）
        * 默认情况下，警告只在首次被调用时才会被触发并打印到 stderr。 警告被触发之后，被包装的函数会被调用。
    util.format(format[, ...args])
    util.formatWithOptions(inspectOptions, format[, ...args])

    util.getSystemErrorName(err)
    util.inherits(constructor, superConstructor)  不建议使用 util.inherits()。 请使用 ES6 的 class 和 extends 关键词获得语言层面的继承支持。

    util.inspect(object[, options])#
    util.inspect(object[, showHidden[, depth[, colors]]])
  */
  function callbackfn() {
    async function fn() {
      // 如果回调函数的首个参数为 Promise 拒绝的原因且带有返回值，且值可以转换成布尔值 false，这个值会被封装在 Error 对象里，可以通过属性 reason 获取。
      return Promise.reject('')
    }
    const cb = util.callbackify(fn)
    cb((err, ret) => {
      console.log(err, ret)
    })
  }
  function tdebug() {
    const debuglog = util.debuglog('foo');
    debuglog('hello from foo [%d]', 123);
  }
  function deprecate() {
    const a = util.deprecate(() => {
      // 一些操作。
      console.log('111111111111111111111')
    }, 'a() 已弃用，使用 b() 代替');
    a()
  }
  console.log(util.format('xxx %cxxxxx', "color: 'red'", { a: 1 }))
  // deprecate()
}


function testV8() {
  const v8 = require('v8');
  /*
      v8 模块暴露了特定于内置到 Node.js 二进制文件中的 V8 版本的 API。 可以使用以下方式访问它：


      v8.cachedDataVersionTag()   返回一个整数，表示从 V8 版本、命令行标志、以及检测到的 CPU 特性派生的版本标记。
      v8.getHeapSpaceStatistics()   返回有关 V8 堆空间的统计信息，即组成 V8 堆的片段。
      v8.getHeapSnapshot()  生成当前 V8 堆的快照，并返回可读流，该可读流可用于读取 JSON 序列化表示。
      v8.getHeapStatistics()  有可以查看内存是否泄漏的变量
      v8.getHeapCodeStatistics()  以编程方式设置 V8 的命令行标志。 应谨慎使用此方法。 虚拟机启动后更改设置可能会导致不可预测的行为，包括崩溃和数据丢失，或者它可能根本就什么都不做。
      v8.writeHeapSnapshot([filename])  生成当前 V8 堆的快照并将其写入 JSON 文件。 此文件旨在与 Chrome DevTools 等工具一起使用。


    序列化的 API
      v8.serialize(value)   //序列化为buffer
      v8.deserialize(buffer)      反序列化
    v8.Serializer 类
  */
  // console.log(v8.cachedDataVersionTag())
  // console.log(v8.getHeapSpaceStatistics())
  // console.log(v8.getHeapSnapshot())
  // console.log(v8.getHeapStatistics())
  // console.log(v8.getHeapCodeStatistics())
  // console.log(v8.setFlagsFromString('--trace_gc'))
  // console.log(v8.serialize({ a: 1 }))     
  // v8.deserialize(buffer)
}


function testVm() {
  /*
   vm 模块不是安全的机制。 不要使用它来运行不受信任的代码。
    new vm.Script(code[, options])    
              创建一个新的 vm.Script 对象只编译 code 但不会执行它。 编译过的 vm.Script 此后可以被多次执行。 code 是不绑定于任何全局对象的，相反，它仅仅绑定于每次执行它的对象。
            script.createCachedData()
            script.runInContext(contextifiedObject[, options])
  */
  const vm = require('vm');

  function runWithContext() {
    const x = 1;

    const context = { x: 2 };
    vm.createContext(context); // 上下文隔离化对象。

    const code = 'x += 40; var y = 17;';
    // `x` and `y` 是上下文中的全局变量。
    // 最初，x 的值为 2，因为这是 context.x 的值。
    vm.runInContext(code, context);

    console.log(context.x); // 42
    console.log(context.y); // 17

    console.log(x); // 1; y 没有定义。
  }


}

function testzlip() {
  /*
  zlib 模块提供通过 Gzip、Deflate/Inflate、和 Brotli 实现的压缩功能。
  
  */
  const zlib = require('zlib');
}



const crypto = require('crypto')

const x = crypto.createHash('md5').update('123456').digest('hex')
console.log(x)
testzlip()