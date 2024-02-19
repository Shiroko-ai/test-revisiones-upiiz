const friendlyHeadings = {
  email: 'Correo',
  name: 'Nombre',
  phone: 'Teléfono',
  ticketNumber: 'Boleta',
  career: 'Carrera',
  status: 'Estado',
  id: 'id'
}
export default function setFriendlyHeadings (data: Array<Record<string, string>>): Array<Record<string, string>> {
  const newData = data.map((item) => {
    console.log(item)
    const newItem: Record<string, string> = {}
    for (const key in item) {
      console.log(key)
      newItem[(friendlyHeadings as Record<string, string>)[key]] = item[key]
      console.log(newItem)
    }
    return newItem
  })
  return newData
}
