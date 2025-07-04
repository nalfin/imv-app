import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { EyeIcon, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { LoadingSpinner } from '@/components/loading-spinner'

const FormLogin = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL

    const { push } = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)

    const handleLogin = async (e: any) => {
        e.preventDefault()

        const form = {
            username: username,
            password: password
        }

        const res = await axios.post(`${baseURL}/api/login`, form)
        console.log(form, baseURL)

        const result = await res.data

        setIsSubmit(true)
        if (result.success === true) {
            push('/dashboard')
        } else {
            setIsSubmit(false)
            setMessage(result.message)
        }
    }

    const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-8 px-4">
            <div className="flex justify-center">
                <Link href="/">
                    <Image
                        src="/images/TS_gold_white_square.png"
                        alt="logo"
                        width={64}
                        height={64}
                        priority
                        className="w-auto"
                    />
                </Link>
            </div>
            <form onSubmit={handleLogin}>
                <Card className="w-full rounded-xl md:w-[400px]">
                    <CardHeader className="flex flex-col justify-center">
                        <CardTitle className="text-center text-2xl">
                            Sign in to an account
                        </CardTitle>
                        <CardDescription className="text-center">
                            Silahkan masukan username dan password
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex w-full flex-col gap-4">
                        {message === '' ? (
                            <></>
                        ) : (
                            <p className="text-center text-sm text-yellow-500">
                                {message}
                            </p>
                        )}
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                className="w-full"
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    className="w-full"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                />
                                <Button
                                    variant="link"
                                    className="absolute top-1/2 right-1 z-10 -translate-y-1/2 cursor-pointer px-2"
                                    onClick={handleTogglePassword}
                                >
                                    {showPassword ? (
                                        <EyeOff className="text-muted-foreground size-4" />
                                    ) : (
                                        <EyeIcon className="text-muted-foreground size-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            {isSubmit ? (
                                <div className="flex items-center space-x-1">
                                    <LoadingSpinner className="size-4" />
                                    <span>Login ...</span>
                                </div>
                            ) : (
                                'Login'
                            )}
                        </Button>
                        <p className="text-muted-foreground text-center text-sm">
                            By clicking continue, you agree to our Terms of
                            Service and Privacy Policy.
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

export default FormLogin
