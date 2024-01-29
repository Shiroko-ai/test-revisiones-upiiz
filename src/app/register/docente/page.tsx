import CenterContainer from "@/app/components/containers/CenterContainer"
import Form from "@/app/components/ui/Form"
import Input from "@/app/components/ui/Input"
import Select from "@/app/components/ui/Select"
import Button from "@/app/components/ui/Button"
export default function RegisterDocentePage(): JSX.Element {
    return (
        <CenterContainer>
            <Form
                title="Registro de docentes"
                url="/api/register-teacher"

            >
                <Input type="text" name="nombre" placeholder="Nombre" required />
                <Input
                    type="text"
                    name="numeroEmpleado"
                    placeholder="Número de empleado"
                    required
                    maxlength="10"
                />
                <Input
                    type="email"
                    name="correoInstitucional"
                    placeholder="Correo institucional"
                    required
                />
                <Input type="email" name="correo" placeholder="Correo" required />
                <Input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    required
                />
                <Input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    required
                />
                <Input
                    type="text"
                    name="academia"
                    placeholder="Academia"
                    required
                />
                <Button type="submit" value="Registrarse" />
            </Form>
        </CenterContainer>
    )


}

