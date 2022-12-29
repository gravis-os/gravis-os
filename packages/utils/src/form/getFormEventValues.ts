const getFormEventValues = (e) =>
  Object.fromEntries((new FormData(e.target) as any).entries())

export default getFormEventValues
