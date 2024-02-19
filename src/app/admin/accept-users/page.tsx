'use client'
import CenterContainer from '@/app/components/containers/CenterContainer'
import Table from '@/app/components/ui/Table'
import { type ButtonType } from '../../../../types/types'
import { useState, useEffect } from 'react'

const actions = [
  {
    value: 'Aceptar',
    onClick: (reference: string) => {
      fetch('/api/pending-users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: reference })
        }).then(async response => await response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => { console.log(error) })
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
const hiddenNames = ['id']
export default function AcceptUsersPage (): JSX.Element {
  const [users, setUsers] = useState<Array<Record<string, unknown>>>()
  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      const response = await fetch('/api/pending-users')
      const data = await response.json()
      console.log(data)
      setUsers(data as Array<Record<string, unknown>>)
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchUsers()
  }, [])
  return (
        <>

            <CenterContainer>
                <Table
                data={users}
                actions={actions}
                name="Alumnos"
                hiddenNames={hiddenNames}
                itemReference = "id"
                />
            </CenterContainer>
        </>
  )
}
