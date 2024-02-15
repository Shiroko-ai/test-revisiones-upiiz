'use client'
import { type ReactNode } from 'react'

import Button from './Button'

type ButtonType = 'submit' | 'reset' | 'button'
interface Action {
  value: string
  type: ButtonType
  url?: string
  onClick?: (key: any) => void
}
interface TableProps {
  data: any
  actions?: Action[]
  name?: string
}

export default function Table ({ data, actions, name }: TableProps): JSX.Element {
  if (!data) return (<><h1 className="text-2xl font-bold text-gray-900 mb-10">{name}</h1></>)
  return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mb-10">{name}</h1>
            <table className="max-w-[50%] w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        {
                            Object.keys(data[0]).map((key: string) => (
                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={key}>
                                    {key}
                                </th>
                            ))
                        }
                        {
                            actions && (
                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Acciones</th>
                            )
                        }

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
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <div className="flex flex-row space-x-2">
                                            {actions.map((action, index) => (
                                                <Button
                                                    key={index}
                                                    value={action.value}
                                                    type={action.type}
                                                    url={action.url}
                                                    onClick={() => action.onClick?.(item.key)}
                                                />
                                            ))}
                                        </div>
                                    </td>)}

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
  )
}
