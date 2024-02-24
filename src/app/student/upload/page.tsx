import Button from '@/app/components/ui/Button'
import DragAndDrop from '@/app/components/ui/DragAndDrop'
import Form from '@/app/components/ui/Form'
import Input from '@/app/components/ui/Input'

export default function UploadPage (): JSX.Element {
  return (
        <div>
        <Form title= "Subir documento" url = "/api/upload-document">
          <Input name="name" placeholder='Nombre del documento' type='text' />
          <DragAndDrop
            description='Sólo se permiten archivos PDF'
            name="file"
            allowedTypes={['application/pdf']}
          />
          <Button type = "submit" value="Subir"/>
        </Form>
        </div>
  )
}
