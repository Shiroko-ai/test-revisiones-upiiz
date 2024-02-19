import Navbar from '../components/ui/Navbar'

const links = {
  'Subir documentos': '/student/upload',
  Revisiones: '/student/reviews'
}
export default function AdminLayout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <>
    <Navbar
      links={links}
      profilePage='/student/profile'
      editPage='/student/edit-profile'
    />
    {children}
    </>
  )
}
