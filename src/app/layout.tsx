import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iniciar sesión - Anteproyectos UPIIZ',
  description: 'Inicia sesión con tu cuenta'
}

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className='h-full bg-white'>
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  )
}
