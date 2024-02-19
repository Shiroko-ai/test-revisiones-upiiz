export default function objectToArray (obj: Record<string, string> | null): Array<Record<string, string>> {
  const array = []
  console.log(obj)
  for (const key in obj) {
    array.push({ Nombre: key, Valor: obj[key] })
  }
  console.log(array)
  return array
}
