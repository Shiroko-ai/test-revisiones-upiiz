/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
'use client'

import CenterContainer from '@/app/components/containers/CenterContainer'
import Table from '@/app/components/ui/Table'
import { useEffect, useState } from 'react'

export default function StudentProfile (): JSX.Element {
  function visualizeDocument (key: any): void {
    window.open('/' + key.path, '_blank')
  }
  const [data, setData] = useState<Array<Record<string, unknown>>>([])
  const [documents, setDocuments] = useState<Array<Record<string, unknown>>>([])
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch('/api/get-user')
      const data = await response.json()
      if (data.message !== undefined) {
        console.log(data.message)
      }
      const response2 = await fetch('/api/get-documents')
      const data2 = await response2.json()
      setDocuments(data2.documents as Array<Record<string, unknown>>)
      setData(data as Array<Record<string, unknown>>)
    }
    fetchData().catch(error => { console.log(error) })
  }, [])
  return (
        <div>
        <CenterContainer>
        <div className='mb-10'>
        <Table data={data} name='Perfil'/>
        </div>
        <Table
        data={documents}
        name='Documentos'
        hiddenNames={['path']}
        actions={[{
          value: 'Visualizar documento',
          type: 'button',
          onClick: visualizeDocument
        }]}/>
        </CenterContainer>
        </div>
  )
}
