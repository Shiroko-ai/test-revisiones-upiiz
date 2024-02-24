'use client'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
import { useEffect, useState } from 'react'
export default function EditStudentProfilePage (): JSX.Element {
  const [fetchedData, setFetchedData] = useState<Record<string, any>>({})
  useEffect(() => {
    async function fetchEditUser (): Promise<void> {
      const response = await fetch('/api/get-user?edit=true')
      const data = await response.json()
      console.log(data)
      setFetchedData(data as Record<string, any>)
    }
    fetchEditUser().catch((error) => { console.error(error) })
  }, [])
  return (
        <div>
        <Form title='Editar datos de contacto' url='/api/edit-user'>
            <Input name="phone" type="text" placeholder='Teléfono' fetchedValue={fetchedData.phone} />
            <Input name="email" type="email" placeholder='Correo electrónico' fetchedValue={fetchedData.email}/>
            <Button type="submit" value="Guardar" />
        </Form>
        </div>
  )
}
