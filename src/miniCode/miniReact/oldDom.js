import { isText, isReactComponent, isFunctionComponent, isString, isEventAttr } from './util'
export function render(vnode, container) {
  console.log('vnode, container', vnode)
  const node = createNode(vnode)
  console.log(node)
  container.appendChild(node)
}


function createNode(vnode) {
  console.log('createNode', vnode)
  const { type, props: { children, ...otherProps } } = vnode
  let node = null
  if (isText(type)) {
    node = document.createTextNode('')
  } else if (isReactComponent(type)) {
    console.log('classCom', type)
    let com = new type(vnode.props)
    let vvnode = com.render()
    node = createNode(vvnode)
    return node
  } else if (isFunctionComponent(type)) {
    let vvnode = type(vnode.props)
    node = createNode(vvnode)
    return node
  } else if (isString(type)) {
    node = document.createElement(type)
  }
  updateNode(node, otherProps)
  if (children && children.length > 0) {
    reconcileChildren(node, children)
  }
  return node
}

function updateNode(node, props) {
  Object.keys(props).forEach(key => {
    if (isEventAttr(key)) {
      const name = RegExp.$1.toLowerCase()
      console.log(name)
      node.addEventListener(name, props[key])
      console.log(key)
    } else {
      node[key] = props[key]
    }
  })
}

function reconcileChildren(node, children) {
  children.forEach(child => {
    render(child, node)
  })
}