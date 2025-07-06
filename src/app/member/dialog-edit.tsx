'use client'

import { useEffect, useState } from 'react'
import { Member } from '@/types/member'
import { LoadingSpinner } from '@/components/loading-spinner'
import { FullScreenLoader } from '@/components/fullscreen-loader'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
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
import { updateMember } from '@/lib/api/member/update-member'

export function DialogEditMember({
    member,
    open,
    onOpenChange,
    onSuccess
}: {
    member: Member
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}) {
    const [nama, setNama] = useState(member.name)
    const [lvl, setLvl] = useState<number>(member.lvl)
    const [trop, setTrop] = useState(member.trop)
    const [role, setRole] = useState(member.role)
    const [status, setStatus] = useState(member.status)

    const [isSubmit, setIsSubmit] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        setNama(member.name)
        setLvl(member.lvl)
        setTrop(member.trop)
        setRole(member.role)
        setStatus(member.status)
    }, [member])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!nama || !lvl || !role || !trop || !status) {
            alert('❌ Semua field harus diisi!')
            return
        }

        setIsSubmit(true)

        try {
            const result = await updateMember({
                id: member.id,
                nama,
                level: lvl,
                role,
                trop,
                status
            })

            if (result.success) {
                setIsSuccess(true)
                onSuccess?.()

                setTimeout(() => {
                    onOpenChange(false)
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
        <>
            {isSubmit && !isSuccess && <FullScreenLoader />}

            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="font-mono sm:max-w-[425px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Edit Member</DialogTitle>
                            <DialogDescription>
                                Ubah data member Indonesian Mafia
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
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
                                        value={lvl}
                                        onChange={(e) =>
                                            setLvl(
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-span-1 grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Select
                                        value={role}
                                        onValueChange={(value) =>
                                            setRole(value)
                                        }
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Pilih Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="R5">
                                                R5
                                            </SelectItem>
                                            <SelectItem value="R4">
                                                R4
                                            </SelectItem>
                                            <SelectItem value="R3">
                                                R3
                                            </SelectItem>
                                            <SelectItem value="R2">
                                                R2
                                            </SelectItem>
                                            <SelectItem value="R1">
                                                R1
                                            </SelectItem>
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
                                        value={trop}
                                        onChange={(e) =>
                                            setTrop(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-span-1 grid gap-3">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={status}
                                        onValueChange={(
                                            value: 'ACTIVE' | 'INACTIVE'
                                        ) => setStatus(value)}
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
                                disabled={isSubmit}
                                className={`w-full text-white ${
                                    isSuccess
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-indigo-500 hover:bg-indigo-600'
                                }`}
                            >
                                {isSubmit ? (
                                    <div className="flex items-center space-x-1">
                                        <LoadingSpinner className="size-4" />
                                        <span>
                                            {isSuccess
                                                ? 'SUCCESS'
                                                : 'LOADING ...'}
                                        </span>
                                    </div>
                                ) : (
                                    'UPDATE'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
