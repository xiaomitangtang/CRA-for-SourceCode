class Vue {
  constructor(options) {
    this.$options = options
    const { el, data, methods } = options
    this.$data = data
    this.$methods = methods
    observe(this.$data)
    proxy(this, '$data')
    proxy(this, '$methods')
    if (el) {
      this.mount(elToNode(el))
    }
  }
  mount(container) {
    this.compile(container)
  }
  compile(node) {
    let children = node.childNodes
    Array.from(children).forEach(child => {
      if (isElement(child)) {
        this.compileEl(child)
        this.compile(child)
      } else if (isTextNode(child)) {
        this.compileTextNode(child)
      }
    })
  }
  compileEl(node) {
    const attrs = Array.from(node.attributes)
    attrs.forEach(attr => {
      const { name, value } = attr
      console.log(name, value)
      if (isEventAttr(name)) {
        const event = this[value]
        if (event) {
          node.addEventListener(RegExp.$1, event)
        }
      } else if (isTextAttr(name)) {
        this.update(node, value, 'text')
      }
    })
  }
  compileTextNode(node) {
    if (isMustacle(node.nodeValue)) {
      let key = RegExp.$1
      this.update(node, key, 'text')
    }
  }
  update(node, key, dir) {
    const fn = () => {
      this[dir + 'Updater'](node, key)
    }
    new Watcher(this, key, fn)
    fn()
  }
  textUpdater(node, key) {
    if (node.nodeType === 3) {
      node.nodeValue = this[key]

    } else {
      node.textContent = this[key]
    }
  }
}


function isEventAttr(name) {
  return name && /^v-on:(.*)/.test(name)
}
function isTextAttr(name) {
  return name && /^v-text$/.test(name)
}
function isElement(node) {
  return node && node.nodeType === 1
}
function isTextNode(node) {
  return node && node.nodeType === 3
}
function isMustacle(msg) {
  return msg && /\{\{(.*)\}\}/.test(msg)
}
function elToNode(el) {
  if (typeof el === 'string' && el.startsWith('#')) {
    return document.getElementById(el.slice(1))
  }
  return el
}
function proxy(obj, sourceKey) {
  let sourceData = obj[sourceKey]
  if (isObj(sourceData)) {
    Object.keys(sourceData).forEach(key => {
      Object.defineProperty(obj, key, {
        get() { return sourceData[key] },
        set(nval) {
          sourceData[key] = nval
        }
      })
    })
  }
}

function observe(obj) {
  if (!isObj(obj)) return
  Object.keys(obj).forEach(key => {
    reactive(obj, key, obj[key])
  })
}
function reactive(obj, key, value) {
  const dep = new Dep()
  if (isObj(value)) {
    observe(value)
  }
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.add()
      }
      return value
    },
    set(nval) {
      if (isObj(nval)) {
        value = observe(nval)
      } else {
        value = nval
      }
      dep.notify()
    }
  })
}

class Dep {
  constructor() {
    this.deps = []
  }
  notify() {
    this.deps.forEach(wa => wa.update())
  }
  add() {
    this.deps.push(Dep.target)
  }
}
class Watcher {
  constructor(vm, key, fn) {
    this.$vm = vm
    this.fn = fn
    Dep.target = this
    vm[key]
    Dep.target = null
  }
  update() {
    this.fn && this.fn()
  }
}













function isObj(obj) {
  return typeof obj === 'object' && obj !== null
}