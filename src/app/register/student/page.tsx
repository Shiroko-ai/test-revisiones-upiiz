import CenterContainer from '@/app/components/containers/CenterContainer'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Button from '@/app/components/ui/Button'
export default async function RegisterAlumnoPage (): Promise<JSX.Element> {
  async function fetchCareers (): Promise<Array<Record<string, string>>> {
    const response = await fetch(`${process.env.URL}/api/careers`)
    const data = await response.json()
    return data
  }

  const careers = await fetchCareers()
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
                        {careers.map((career) => (<option value={career._id} key={career._id}>{career.name}</option>))}
                    </Select>
                    <Button type="submit" value="Registrarse" />
                </Form>

        </>
  )
}
