const friendlyKeys = {
  email: 'Correo',
  name: 'Nombre',
  phone: 'Teléfono',
  ticketNumber: 'Boleta',
  career: 'Carrera',
  status: 'Estado',
  id: 'id'
}
export default function setFriendlyKeys (data: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  const newData = data.map((item) => {
    console.log(item)
    const newItem: Record<string, unknown> = {}
    for (const key in item) {
      console.log(key)
      if (key === 'Nombre') {
        console.log(item[key])
        newItem[key] = friendlyKeys[item[key] as keyof typeof friendlyKeys]
      } else {
        newItem[key] = item[key]
      }
      console.log(newItem)
    }
    return newItem
  })
  return newData
}
