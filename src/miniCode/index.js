import { render } from './miniReact/oldDom'
import React, { Component } from './miniReact/react'
import ReactDom from './miniReact/react-dom'
import { useState } from './miniReact/widthFiber'

function FccOM() {
  const [count, setCount] = useState(1)
  console.log({ count, setCount })
  return <div>
    <h2 onClick={
      (e) => console.log('点击了函数组件', e)
    }>我是函数组件---</h2>
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  </div>
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>我是测试代码</h1>
        <hr />
        <FccOM />
      </div>
    )
  }
}
export default function start() {
  ReactDom.render(<App />, document.getElementById('root'))
  console.log('xxxxxstart')
}