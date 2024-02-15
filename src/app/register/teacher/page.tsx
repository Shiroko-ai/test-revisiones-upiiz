import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Select from '@/app/components/ui/Select'
import Button from '@/app/components/ui/Button'
export default function RegisterDocentePage (): JSX.Element {
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
                    <option value="Sistemas">Sistemas</option>
                    <option value="Ambiental">Ambiental</option>
                    <option value="Matemáticas">Matemáticas</option>
                </Select>

                <Button type="submit" value="Registrarse" />
            </Form>

  )
}
