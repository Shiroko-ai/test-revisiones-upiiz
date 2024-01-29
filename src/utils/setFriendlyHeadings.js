const friendlyHeadings = {
    "correo": "Correo",
    "nombre": "Nombre",
    "telefono": "Teléfono",
    "boleta": "Boleta",
    "carrera": "Carrera",
    "status": "Estado",
}
export default function setFriendlyHeadings(data) {
    const newData = data.map((item) => {
        const newItem = {};
        for (const key in item) {
            newItem[friendlyHeadings[key]] = item[key];
        }
        return newItem;
    });
    return newData;
}