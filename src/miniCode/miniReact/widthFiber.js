import { isEventAttr, isFunctionComponent, isReactComponent, isText, isInvalidAttr } from "./util"
const UPDATE = 'UPDATE', DELETETION = 'DELETION', PLACEMENT = 'PLACEMENT'
let nextUnitOfWork = null
let wipRoot = null
let cuurentRoot = null
let deletions = null
let wipFiber = null
let fiberHookIndex = null
// fiber {type,props,effectTag,child,sibling,parent,node}

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)
function createNode(fiber) {
  const { type, props } = fiber
  let node = null
  if (isText(type)) {
    node = document.createTextNode('')
  } else {
    node = document.createElement(type)
  }
  updateNode(node, {}, props)
  return node
}
function updateNode(node, old, props) {
  Object.keys(old).forEach(key => {
    if (isInvalidAttr(key)) return
    if (isEventAttr(key)) {
      if (old[key] === props[key]) return
      const name = RegExp.$1.toLowerCase()
      node.removeEventListener(name, old[key])
    } else if (!(key in props)) {
      node[key] = ''
    }
  })
  Object.keys(props).forEach(key => {
    if (isInvalidAttr(key)) return
    if (isEventAttr(key)) {
      if (old[key] === props[key]) return
      const name = RegExp.$1.toLowerCase()
      node.addEventListener(name, props[key])
    } else {
      node[key] = props[key]
    }
  })
}
function performUnitOfWork(fiber) {
  const { type } = fiber
  if (isReactComponent(type)) {
    updateClassComponent(fiber)
  } else if (isFunctionComponent(type)) {
    updateFunctionComponent(fiber)
  } else {
    updateHostConponent(fiber)
  }

  if (fiber.child) return fiber.child
  let nextUnitFiber = fiber
  while (nextUnitFiber) {
    if (nextUnitFiber.sibling) return nextUnitFiber.sibling
    nextUnitFiber = nextUnitFiber.parent
  }

}
function reconcileChildren(workInprogressFiber, children = []) {
  let oldFiber = workInprogressFiber.base && workInprogressFiber.base.child
  let prevSibling = null
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    let newFiber = null
    const isSametyppe = oldFiber && child && oldFiber.type === child.type

    if (isSametyppe) {
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        child: null,
        sibling: null,
        parent: workInprogressFiber,
        effectTag: UPDATE
      }
    }
    if (!isSametyppe && child) {
      newFiber = {
        type: child.type,
        props: child.props,
        parent: workInprogressFiber,
        child: null,
        sibling: null,
        effectTag: PLACEMENT
      }
    }
    if (!isSametyppe && oldFiber) {
      oldFiber.effectTag = DELETETION
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if (i === 0) {
      workInprogressFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
  }
}
function updateClassComponent(fiber) {
  const { type, props } = fiber

  let children = [new type(props).render()]
  reconcileChildren(fiber, children)

}
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  fiberHookIndex = 0
  wipFiber.hooks = []
  const { type, props } = fiber
  let children = [type(props)]
  reconcileChildren(fiber, children)

}
function updateHostConponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}



// commit 
function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  cuurentRoot = wipRoot
  wipRoot = null
}
function commitWork(fiber) {
  if (!fiber) return
  const { effectTag } = fiber
  console.log('effectTag', effectTag)
  let parentNodeFiber = fiber.parent
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.parent
  }
  const parentNode = parentNodeFiber.node
  if (effectTag === PLACEMENT && fiber.node) {
    parentNode.appendChild(fiber.node)
  } else if (effectTag === UPDATE && fiber.node) {
    updateNode(fiber.node, fiber.base.props, fiber.props)
  } else if (effectTag === DELETETION && fiber.node) {
    commitDeletion(parentNode, fiber.node)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
function commitDeletion(parentNode, node) {
  parentNode.removeChild(node)
}
export function useState(init) {
  const oldHook = wipFiber.base && wipFiber.base.hooks[fiberHookIndex]
  const hook = {
    state: oldHook ? oldHook.state : init,
    quene: oldHook ? oldHook.quene : []
  }
  const actions = oldHook ? oldHook.quene : []
  actions.forEach(action => {
    hook.state = action
  })
  const setState = function (action) {
    hook.quene.push(action)
    deletions = []
    wipRoot = {
      node: cuurentRoot.node,
      base: cuurentRoot,
      props: cuurentRoot.props,
    }
    nextUnitOfWork = wipRoot
  }
  wipFiber.hooks.push(hook)
  fiberHookIndex++
  return [hook.state, setState]
}

export function render(vnode, container) {
  console.log('fiber', vnode, container)
  wipRoot = {
    type: vnode.type,
    node: container,
    props: {
      children: [vnode]
    }
  }
  nextUnitOfWork = wipRoot
  deletions = []
}

export default {
  render, useState
}


