'use client'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Button from '@/app/components/ui/Button'
import { useEffect, useState } from 'react'
export default function RegisterDocentePage (): JSX.Element {
  const [academies, setAcademies] = useState<Array<Record<any, any>>>([])
  useEffect(() => {
    function fetchAcademies (): void {
      fetch('/api/academies')
        .then(async response => await response.json())
        .then(data => {
          console.log(data)
          setAcademies(data as Array<Record<any, any>>)
        }).catch(error => {
          console.error(error)
        }
        )
    }
    fetchAcademies()
  }, [])
  return (

            <Form
                title="Registro de docentes"
                url="/api/register-teacher"

            >
                <Input type="text" name="name" placeholder="Nombre" required />
                <Input
                    type="text"
                    name="employeeNumber"
                    placeholder="Número de empleado"
                    required
                    maxLength="10"
                />
                <Input
                    type="email"
                    name="institutionalEmail"
                    placeholder="Correo institucional"
                    required
                />
                <Input type="email" name="email" placeholder="Correo" required />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    required
                />
                <Input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    required
                />
                <Select name="academy" label='Academia' id='academy' >
                   {academies.map((academy, index) => {
                     return <option key={index} value={academy._id}>{academy.name}</option>
                   })}
                </Select>

                <Button type="submit" value="Registrarse" />
            </Form>

  )
}
