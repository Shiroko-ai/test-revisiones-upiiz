'use client'
import CenterContainer from '@/app/components/containers/CenterContainer'
import Table from '@/app/components/ui/Table'
import { type ButtonType } from '../../../../types/types'
import { useState, useEffect } from 'react'

const actions = [
  {
    value: 'Aceptar',
    onClick: () => {
      console.log('Accept')
    },
    type: 'button' as ButtonType
  },
  {
    value: 'Rechazar',
    onClick: () => {
      console.log('Reject')
    },
    type: 'button' as ButtonType
  }
]
export default function AcceptUsersPage (): JSX.Element {
  const [users, setUsers] = useState<Array<Record<string, unknown>>>()
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const response = await fetch('/api/pending-users')
      const data = await response.json()
      setUsers(data.data as Array<Record<string, unknown>>)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUsers()
  }, [])
  return (
        <>

            <CenterContainer>
                <Table data={users} actions={actions} name="Alumnos" />
            </CenterContainer>
        </>
  )
}
