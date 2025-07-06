'use client'

import { usePathname } from 'next/navigation'
import Header from './header'

const LayoutPages = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    const hideNavbar = pathname === '/login' || pathname === '/register'

    return (
        <main className="container-fluid mx-auto max-w-[1440px] px-4 md:px-8 lg:px-20">
            {!hideNavbar && <Header />}
            {children}
            <footer className="text-muted-foreground mt-10 w-full border-t py-6 text-center text-sm">
                Made with ❤️ by{' '}
                <span className="text-primary font-semibold">IMV REYS</span>
            </footer>
        </main>
    )
}

export default LayoutPages
