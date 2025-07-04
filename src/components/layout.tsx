'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'

const LayoutPages = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    const hideNavbar = pathname === '/login' || pathname === '/register'

    return (
        <main className="container-fluid mx-auto max-w-[1440px] px-4 md:px-8 lg:px-20">
            {!hideNavbar && <Navbar />}
            {children}
        </main>
    )
}

export default LayoutPages
