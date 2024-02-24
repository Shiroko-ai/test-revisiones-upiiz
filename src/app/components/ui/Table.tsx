/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  hiddenNames?: string[]
  itemReference?: string
}

export default function Table ({ data, actions, name, hiddenNames, itemReference }: TableProps): JSX.Element {
  if (data === undefined || data === null || data.length === 0 || !data) {
    console.log('No data')
    return (<>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {name}
        </h1>
    <h2 className="text-xl  text-gray-400 mb-10">
        Sin datos disponibles
        </h2>

    </>)
  }
  return (
        <>
            <h1 className="text-2xl font-bold text-gray-900 mb-10">{name}</h1>
            <table className="max-w-[50%] w-full min-w-max">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        {
                            Object.keys(data[0] as any[]).map((key: string) => (
                              hiddenNames?.includes(key)
                                ? null
                                : <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left" key={key}>
                                    {key}
                                </th>

                            ))
                        }
                        {
                            actions !== undefined && (
                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Acciones</th>
                            )
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any) => (
                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={item.Boleta}>
                                {
                                Object.entries(item as Record<string, any>).map(([key, value]) => (
                                  hiddenNames?.includes(key)
                                    ? null
                                    : <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={key}>
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
                                                    onClick={() => action.onClick?.(itemReference ? item[itemReference] : item)}
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
