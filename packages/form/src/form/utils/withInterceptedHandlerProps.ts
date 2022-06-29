// Intercepts handlers in props with handlers of the same name in overridingProps e.g. to intercept onChange
const withInterceptedHandlerProps =
  <
    Props extends Record<string, unknown>,
    OverridingProps extends Record<string, unknown>
  >(
    props: Props
  ) =>
  (overridingProps: OverridingProps): Props & OverridingProps => {
    const interceptedHandlers = Object.entries(props).reduce(
      (acc, [name, handler]) => {
        if (
          typeof handler === 'function' &&
          typeof overridingProps[name] === 'function'
        ) {
          const interceptor = overridingProps[name] as typeof handler
          const interceptedHandler = (...params) =>
            handler(interceptor(...params))
          return { ...acc, [name]: interceptedHandler }
        }
        return acc
      },
      {}
    )
    return {
      ...props,
      ...overridingProps,
      ...interceptedHandlers,
    }
  }

export default withInterceptedHandlerProps
