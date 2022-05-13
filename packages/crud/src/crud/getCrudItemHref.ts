const getCrudItemHref = ({ module, item }) =>
  `${module.route.plural}/${item?.[module.sk]}`

export default getCrudItemHref
