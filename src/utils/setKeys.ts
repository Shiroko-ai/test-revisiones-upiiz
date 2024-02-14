export default function setKeys (arr: Array<Record<string, string>>, key): Array<Record<string, string>> {
  return arr.map(obj => {
    const keyValue = obj[key]
    return { ...obj, key: keyValue }
  })
}
