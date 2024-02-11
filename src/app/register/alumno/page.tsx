import CenterContainer from "@/app/components/containers/CenterContainer"
import Form from "@/app/components/ui/Form"
import Input from "@/app/components/ui/Input"
import Select from "@/app/components/ui/Select"
import Button from "@/app/components/ui/Button"
export default function RegisterAlumnoPage(): JSX.Element {
    return (
        <>
            <CenterContainer>
                <Form
                    title="Registro de alumnos"
                    url="/api/register-alumno"

                >
                    <Input placeholder="Nombre" type="text" name="nombre" />
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
                        name="confirm_password"

                    />
                    <Input
                        placeholder="Teléfono"
                        type="text"
                        name="telefono"

                    />
                    <Input placeholder="Boleta" type="text" name="boleta" />
                    <Select label="Carrera" id="carrera" name="carrera">
                        <option value="ISC">Ingeniería en Sistemas Computacionales</option>
                        <option value="IMEC">Ingeniería en Mecatrónica</option>
                        <option value="IAM">Ingeniería Ambiental</option>
                        <option value="IAL">Ingeniería en Alimentos</option>
                        <option value="IMET">Ingeniería Metalúrgica</option>
                    </Select>
                    <Button type="submit" value="Registrarse" />
                </Form>
            </CenterContainer>
        </>
    )
}