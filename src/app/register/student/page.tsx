'use client'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Button from '@/app/components/ui/Button'
import { useEffect, useState } from 'react'
export default function RegisterAlumnoPage (): JSX.Element {
  const [careers, setCareers] = useState<Array<Record<string, any>>>([])
  useEffect(() => {
    async function fetchCareers (): Promise<void> {
      const response = await fetch('/api/careers')
      const data = await response.json()
      console.log(data)
      setCareers(data as Array<Record<string, any>>)
    }
    fetchCareers().catch(console.error)
  }, [])

  return (
        <>

                <Form
                    title="Registro de alumnos"
                    url="/api/register-student"

                >
                    <Input placeholder="Nombre" type="text" name="name" />
                    <Input
                        placeholder="Correo electrónico"
                        type="email"
                        name="email"

                    />
                    <Input
                        placeholder="Contraseña"
                        type="password"
                        name="password"

                    />
                    <Input
                        placeholder="Confirmar contraseña"
                        type="password"
                        name="confirmPassword"

                    />
                    <Input
                        placeholder="Teléfono"
                        type="text"
                        name="phone"

                    />
                    <Input placeholder="Boleta" type="text" name="ticketNumber" />
                    <Select label="Carrera" id="carrera" name="career">
                        {careers.map((career: Record<string, any >) => (<option value={career._id} key={career._id}>{career.name}</option>))}
                    </Select>
                    <Button type="submit" value="Registrarse" />
                </Form>

        </>
  )
}
