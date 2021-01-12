function Capitalize (val) {
  if (val !== 0 && !val) return ''

  return String(val)
    .toLowerCase()
    .split(' ')
    .map(str => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join(' ')
}

function GetFieldNameById (id, list) {
  const field = list.find(item => item.value === id)
  return field ? field.name : null
}

export {
  GetFieldNameById,
  Capitalize
}