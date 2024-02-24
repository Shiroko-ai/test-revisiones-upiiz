import Form from './components/ui/Form'
import Button from './components/ui/Button'
export default function Index (): JSX.Element {
  return (
        <Form title="¿Qué rol tienes en la institución?" url="">
            <div className='mb-4'>
            <Button value="Alumno" type="button" url="/login/student"/>
            </div>
            <div className='mb-4'>
            <Button value="Docente" type="button" url="/login/teacher"/>
            </div>
            <div className='mb-4'>
            <Button value="Administrador" type="button" url="/login/admin"/>
            </div>
        </Form>
  )
}
