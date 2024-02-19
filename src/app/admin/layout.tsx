import Navbar from '../components/ui/Navbar'

const links = {
  'Aceptar usuarios': '/admin/accept-users',
  'Agregar carreras': '/admin/add-careers'
}
export default function AdminLayout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <>
    <Navbar
      links={links}
      profilePage='/admin/profile'
      editPage='/admin/edit-profile'
    />
    {children}
    </>
  )
}
