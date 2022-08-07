const withHide =
  ({ user }) =>
  (columnDefs) =>
    columnDefs.map(({ hide, ...rest }) => ({
      ...rest,
      hide: typeof hide === 'function' ? hide({ user }) : hide,
    }))

export default withHide
