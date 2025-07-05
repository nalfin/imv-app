'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { DatePickerForm } from './date-picker-form'
import RadioVsDA from './radio-button-vsda'
import { useState } from 'react'
import { FullScreenLoader } from '@/components/fullscreen-loader'
import { VSDA } from '@/types/vsda'
import { updateVSDA } from '@/lib/api/vsda/update-vsda'
import { LoadingSpinner } from '@/components/loading-spinner'

interface vsdaEditProps {
    vsdaData: VSDA[]
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

const DialogEditVSDA = ({
    vsdaData,
    open,
    onOpenChange,
    onSuccess
}: vsdaEditProps) => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [selectedPoin, setSelectedPoin] = useState<string>('')
    const [selectedTanggal, setSelectedTanggal] = useState<Date | undefined>()
    const [progress, setProgress] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)

    const totalItems = vsdaData.length

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmit(true)
        setProgress(0)
        setShowSuccess(false)

        try {
            for (let i = 0; i < vsdaData.length; i++) {
                await updateVSDA({
                    data: [vsdaData[i]],
                    tanggal: selectedTanggal,
                    poin: selectedPoin
                })

                setProgress((prev) => prev + 1)
            }

            setShowSuccess(true)
            if (onSuccess) onSuccess()
            setTimeout(() => {
                onOpenChange(false)
            }, 1000)
        } catch (err) {
            console.error(err)
            alert('Gagal update data')
        } finally {
            setIsSubmit(false)
        }
    }

    const renderButtonText = () => {
        if (showSuccess) return 'SUCCESS'
        if (isSubmit)
            return (
                <div className="flex items-center space-x-1">
                    <LoadingSpinner className="size-4" />
                    <span>
                        LOADING ... ({progress}/{totalItems})
                    </span>
                </div>
            )
        return 'UPDATE'
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="font-mono sm:max-w-[550px]">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <DialogHeader className="text-left">
                            <DialogTitle>Edit Poin DA</DialogTitle>
                            <DialogDescription>
                                Ubah data poin VS DA member Indonesian Mafia
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <DatePickerForm
                                value={selectedTanggal}
                                onChange={setSelectedTanggal}
                            />
                            <div className="bg-secondary/40 border-border rounded-sm border p-6">
                                <RadioVsDA
                                    value={selectedPoin}
                                    onChange={setSelectedPoin}
                                />
                            </div>
                            <div className="bg-secondary/40 border-border grid gap-3 rounded-sm border p-6">
                                <p className="text-accent-foreground text-sm">
                                    Daftar nama yang diedit poinnya:
                                </p>
                                <p className="text-sm">
                                    {(Array.isArray(vsdaData)
                                        ? vsdaData
                                        : [vsdaData]
                                    )
                                        .map((v) => v.name)
                                        .join(', ')}
                                </p>
                            </div>
                        </div>
                        <DialogFooter className="mt-3">
                            <Button
                                type="submit"
                                className={`w-full text-white transition-all duration-300 hover:brightness-110 ${showSuccess ? 'bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'} `}
                                disabled={isSubmit}
                            >
                                {renderButtonText()}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogEditVSDA
