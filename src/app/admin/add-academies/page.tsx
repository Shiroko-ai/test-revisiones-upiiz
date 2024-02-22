import CenterContainer from '@/app/components/containers/CenterContainer'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'
import Button from '@/app/components/ui/Button'
export default function addAcademies (): JSX.Element {
  return (
    <CenterContainer>
    <Form title= "Agregar academias" url="/api/academies">
      <Input label="Nombre" name="name" type="text" placeholder="Nombre de la academia"/>
      <Button type="submit" value='Agregar'/>
    </Form>
</CenterContainer>
  )
}
