export default function setKeys(arr, key) {
    return arr.map(obj => {
        const keyValue = obj[key];
        return { ...obj, key: keyValue };
    });
}