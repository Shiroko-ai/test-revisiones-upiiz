/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client'
import CenterContainer from '@/app/components/containers/CenterContainer'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
import { useRouter } from 'next/navigation'
export default function StudentLogin (): JSX.Element {
  const router = useRouter()
  function handleSucess (): void {
    router.push('/student')
  }
  return (
        <CenterContainer>
            <Form
                title="Bienvenido, alumno"
                subtitle="Iniciar sesión"
                url="/api/login/student"
                onSuccess={handleSucess}
                >
                <Input
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                />
                <Button type="submit" value="Iniciar sesión" />
            </Form>
        </CenterContainer>
  )
}
