
import { render as renderOld } from './oldDom'
import { render as fiberRender } from './widthFiber'
function render(vnode, container) {
  fiberRender(vnode, container)
  // renderOld(vnode, container)
}








export default {
  render
}