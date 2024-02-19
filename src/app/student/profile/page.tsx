'use client'

import CenterContainer from '@/app/components/containers/CenterContainer'
import Table from '@/app/components/ui/Table'
import { useEffect, useState } from 'react'

export default function StudentProfile (): JSX.Element {
  const [data, setData] = useState<Array<Record<string, unknown>>>([])
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch('/api/get-user')
      const data = await response.json()
      console.log(data)
      if (data.message !== undefined) {
        console.log(data.message)
      }
      setData(data as Array<Record<string, unknown>>)
    }
    fetchData().catch(error => { console.log(error) })
  }, [])
  return (
        <div>
        <CenterContainer>
        <Table data={data} name='Perfil'/>
        </CenterContainer>
        </div>
  )
}
