type SelectProps = {
    label: string;
    id: string;
    children: React.ReactNode;
    name: string;
    [key: string]: any;
}

export default function Select({ label, id, children, name, ...rest }: SelectProps) {
    return (
        <>
            <label htmlFor={id}
                className="block text-sm font-medium text-primary mb-2">
                {label}
            </label>
            <select id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         focus:ring-primary focus:border-primary block w-full p-2.5 
          mb-6" name={name}>
                <option selected disabled>Selecciona una opción</option>
                {children}
            </select>
        </>
    )
}