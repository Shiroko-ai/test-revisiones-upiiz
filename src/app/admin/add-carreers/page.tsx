import CenterContainer from '@/app/components/containers/CenterContainer'
import Button from '@/app/components/ui/Button'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'

export default function addCarreers (): JSX.Element {
  return (
        <CenterContainer>
            <Form title= "Agregar carreras" url="/api/careers">
              <Input label="Nombre" name="name" type="text" placeholder="Nombre de la carrera"/>
              <Button type="submit" value='Agregar'/>
            </Form>
        </CenterContainer>
  )
}
