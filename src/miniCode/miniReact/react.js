import { pureProps, isString, isNumber } from './util'
function createElement(type, props, ...children) {
  console.log('createElement', type)
  const vnode = {
    type,
    props: {
      ...pureProps(props),
      children: transChildren(children)
    }
  }
  return vnode
}
function transChildren(children = []) {
  return children.map(c => {
    if (isString(c) || isNumber(c)) {
      return {
        type: "TEXT", props: { children: [], nodeValue: c }
      }
    }
    return c
  })
}


export class Component {
  static isReactComponent = {}
}

export default { createElement, Component }

