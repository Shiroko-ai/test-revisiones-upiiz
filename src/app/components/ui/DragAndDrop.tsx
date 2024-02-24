/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client'
import { useState } from 'react'

interface Props {
  description: string
  name: string
  allowedTypes?: string[]
}
export default function DragAndDrop ({ description, name, allowedTypes }: Props): JSX.Element {
  const [filename, setFilename] = useState<string>('')
  const [fileSelected, setFileSelected] = useState<boolean>(false)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      if (allowedTypes && !allowedTypes.includes(e.target.files[0].type)) {
        alert('El archivo seleccionado no está en el formato permitido')
        return
      }
      setFilename(e.target.files[0].name)
      setFileSelected(true)
    } else {
      alert('No se ha seleccionado un archivo')
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault()
  }
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      if (allowedTypes && !allowedTypes.includes(e.dataTransfer.files[0].type)) {
        alert('El archivo seleccionado no está en el formato permitido')
        return
      }
      setFilename(e.dataTransfer.files[0].name)
      setFileSelected(true)
    } else {
      alert('No se ha seleccionado un archivo')
    }
  }
  return (

            <div className='mb-6'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subir archivo</label>
<div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file"
    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
    border-dashed rounded-lg cursor-pointer 
    hover:bg-gray-100 ${fileSelected ? 'bg-gray-100' : 'bg-gray-50'}`}
     onDrop={handleDrop}
    onDragEnter={handleDragEnter}
    onDragOver={handleDragOver}
    >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{filename}</span></p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <input
        id="dropzone-file"
        type="file"
        className="hidden"
        name={name}
         onChange={handleFileChange}
        />
    </label>
</div>
            </div>

  )
}
