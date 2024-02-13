'use client'
import Table from '@/app/components/ui/Table'

import { useEffect, useState } from 'react'

export default function ProfilePage (): JSX.Element {
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      console.log(data)
      setUser(data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Cuenta</h1>
      <Table data={user}/>
    </div>
  )
}
