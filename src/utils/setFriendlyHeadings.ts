const friendlyHeadings = {
  correo: 'Correo',
  nombre: 'Nombre',
  telefono: 'Teléfono',
  boleta: 'Boleta',
  carrera: 'Carrera',
  status: 'Estado'
}
export default function setFriendlyHeadings (data: Array<Record<string, string>>): Array<Record<string, string>> {
  const newData = data.map((item) => {
    const newItem: Record<string, string> = {}
    for (const key in item) {
      newItem[(friendlyHeadings as Record<string, string>)[key]] = item[key]
    }
    return newItem
  })
  return newData
}
