import Navbar from '../components/ui/Navbar'

export default function AdminLayout ({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return (
    <>
    <Navbar />
    {children}
    </>
  )
}
