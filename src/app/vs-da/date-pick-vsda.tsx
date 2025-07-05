'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'

function formatDate(date: Date | undefined) {
    if (!date) {
        return ''
    }

    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

export function DatePickVSDA({
    value,
    onChange
}: {
    value: Date | undefined
    onChange: (date: Date | undefined) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
    const [inputValue, setInputValue] = React.useState(formatDate(value))

    // ⬇️ Sync input value & calendar month saat value berubah dari luar
    React.useEffect(() => {
        setInputValue(formatDate(value))
        setMonth(value)
    }, [value])

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex gap-2">
                <Input
                    id="date"
                    value={inputValue}
                    placeholder="June 01, 2025"
                    className="bg-background pr-10 text-sm font-medium"
                    onChange={(e) => {
                        const str = e.target.value
                        const date = new Date(str)
                        setInputValue(str)
                        if (isValidDate(date)) {
                            onChange(date)
                            setMonth(date)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={value}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                if (date) {
                                    onChange(date)
                                    setInputValue(formatDate(date))
                                    setOpen(false)
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
