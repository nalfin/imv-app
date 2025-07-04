'use client'

import { LoadingSpinner } from '@/components/loading-spinner'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'

export function DialogAddMember({ onSuccess }: { onSuccess?: () => void }) {
    const [nama, setNama] = useState('')
    const [lvl, setLvl] = useState<number | ''>('')
    const [trop, setTrop] = useState('')
    const [role, setRole] = useState('')
    const [status, setStatus] = useState('')
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        setLvl(isNaN(value) ? '' : value)

        if (value >= 30) setTrop('T10')
        else if (value >= 27) setTrop('T9')
        else if (value >= 24) setTrop('T8')
        else if (value >= 20) setTrop('T7')
        else if (value >= 17) setTrop('T6')
        else setTrop('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validasi manual karena select components
        if (!nama || !lvl || !role || !trop || !status) {
            alert('❌ Semua field harus diisi!')
            return
        }

        setIsSubmit(true)

        const formBody = new URLSearchParams()
        formBody.append('nama', nama)
        formBody.append('level', String(lvl))
        formBody.append('role', role)
        formBody.append('trops', trop)
        formBody.append('status', status)

        try {
            const res = await fetch(`${baseURL}?action=addMember`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody.toString()
            })

            const result = await res.json()

            if (result.success) {
                // alert('✅ Member berhasil ditambahkan!')
                setIsSuccess(true)
                onSuccess?.()
                // Reset form
                setNama('')
                // setLvl('')
                // setTrop('')
                // setRole('')
                // setStatus('')

                setTimeout(() => {
                    setIsSuccess(false)
                }, 1000)
            } else {
                alert('❌ Gagal: ' + result.message)
            }
        } catch (err) {
            console.error('❌ ERROR:', err)
            alert('Terjadi kesalahan koneksi.')
        }

        setIsSubmit(false)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusCircle />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="font-mono sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add Member IMV</DialogTitle>
                        <DialogDescription>
                            Tambahkan member baru di Indonesian Mafia
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Ingame Name"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-1 grid gap-3">
                                <Label htmlFor="lvl">Level HQ</Label>
                                <Input
                                    id="lvl"
                                    name="lvl"
                                    type="number"
                                    placeholder="30"
                                    value={lvl}
                                    onChange={handleLevelChange}
                                    required
                                />
                            </div>
                            <div className="col-span-1 grid gap-3">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={role}
                                    onValueChange={(value) => setRole(value)}
                                    required
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="R5">R5</SelectItem>
                                        <SelectItem value="R4">R4</SelectItem>
                                        <SelectItem value="R3">R3</SelectItem>
                                        <SelectItem value="R2">R2</SelectItem>
                                        <SelectItem value="R1">R1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-1 grid gap-3">
                                <Label htmlFor="trop">Level Trop</Label>
                                <Input
                                    id="trop"
                                    name="trop"
                                    placeholder="T10"
                                    value={trop}
                                    onChange={(e) => setTrop(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-span-1 grid gap-3">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={status}
                                    onValueChange={(value) => setStatus(value)}
                                    required
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">
                                            ACTIVE
                                        </SelectItem>
                                        <SelectItem value="INACTIVE">
                                            INACTIVE
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-3">
                        <Button
                            type="submit"
                            className={`w-full text-white ${
                                isSuccess
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-indigo-500 hover:bg-indigo-600'
                            }`}
                            disabled={isSubmit || isSuccess}
                        >
                            {isSuccess ? (
                                'SUKSES'
                            ) : isSubmit ? (
                                <div className="flex items-center space-x-1">
                                    <LoadingSpinner className="size-4" />
                                    <span>LOADING ...</span>
                                </div>
                            ) : (
                                'SUBMIT'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
