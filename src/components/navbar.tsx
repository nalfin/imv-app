'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport
} from '@/components/ui/navigation-menu'
import Image from 'next/image'

const Navbar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        const status = localStorage.getItem('isLoggedIn')
        setIsLoggedIn(status === 'true')
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('username')
        setIsLoggedIn(false)
        router.push('/login')
    }

    if (isLoggedIn === null) {
        return null // atau bisa ganti dengan skeleton/loading state
    }

    return (
        <div className="border-border mb-10 flex h-20 items-center justify-between border-b">
            <Link href="/">
                <div className="flex gap-3">
                    <Image
                        src="/images/imv-logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        priority
                    />
                </div>
            </Link>

            {isLoggedIn && (
                <div className="flex gap-6">
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href="/dashboard-member">Member</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href="/vs-da">VS DA</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Event
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-4">
                                        <li>
                                            <NavigationMenuLink asChild>
                                                <Link href="/events/event-1">
                                                    Event I
                                                </Link>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            )}

            {isLoggedIn ? (
                <Button onClick={handleLogout}>Logout</Button>
            ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </div>
    )
}

export default Navbar
