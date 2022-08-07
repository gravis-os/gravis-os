const withTitle =
  ({ isDesktop, disableTitle }) =>
  (columnDefs) =>
    disableTitle
      ? columnDefs
      : [
          {
            headerName: 'Name',
            minWidth: 160,
            pinned: isDesktop && 'left',
            ...columnDefs[0],
          },
          ...columnDefs.slice(1),
        ]

export default withTitle
