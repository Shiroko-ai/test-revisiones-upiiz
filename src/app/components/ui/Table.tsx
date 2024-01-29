
import { ReactNode } from "react";
interface Props {
    data: any;
}

import Button from "./Button";


export default function Table({ data }: Props): JSX.Element {
    return (
        <table className="max-w-[50%]">
            <thead className="bg-gray-200 border-b">
                <tr>
                    {
                        Object.keys(data[0]).map((key: string) => (
                            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={key}>
                                {key}
                            </th>
                        ))
                    }
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item: any) => (
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={item.Boleta}>
                            {Object.entries(item).map(([key, value]) => (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={key}>
                                    {value as ReactNode}
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div className="flex flex-row space-x-2">
                                    <Button value="Aceptar" type="button" url={`/api/accept-user/${item.Boleta}`} />
                                    <Button value="Borrar" type="button" url={`/api/reject-user/${item.Boleta}`} />
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}