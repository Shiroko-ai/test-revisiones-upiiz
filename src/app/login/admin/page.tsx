
import CenterContainer from "@/app/components/containers/CenterContainer"
import Form from "@/app/components/ui/Form"
import Input from "@/app/components/ui/Input"
import Button from "@/app/components/ui/Button"
export default function AdminLogin(): JSX.Element {
    return (
        <CenterContainer>
            <Form
                title="Bienvenido, administrador"
                subtitle="Iniciar sesión"
                url=" ">
                <Input
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    name="email"
                />
                <Button type="submit" value="Iniciar sesión" />
            </Form>
        </CenterContainer>
    )
}
