
export const isText = type => type === 'TEXT'
export const isReactComponent = type => typeof type === 'function' && !!type.isReactComponent


export const isFunctionComponent = type => typeof type === 'function' && !type.isReactComponent

export const isString = type => typeof type === 'string'
export const isNumber = type => typeof type === 'number'

export const isEventAttr = key => /^on(.*)/.test(key)
export const isInvalidAttr = key => key === 'children'
export const pureProps = props => {
  delete props.__self
  delete props.__source
  return props
}