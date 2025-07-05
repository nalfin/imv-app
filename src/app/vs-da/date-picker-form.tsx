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
import { Checkbox } from '@/components/ui/checkbox'

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

export function DatePickerForm({
    value,
    onChange
}: {
    value?: Date
    onChange: (date: Date | undefined) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [month, setMonth] = React.useState<Date | undefined>(value)
    const [valueStr, setValueStr] = React.useState(formatDate(value))

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                Tanggal VS DA
            </Label>
            <div className="relative col-span-3 flex gap-2">
                <Input
                    id="date"
                    value={valueStr}
                    placeholder="June 01, 2025"
                    onChange={(e) => {
                        const inputDate = new Date(e.target.value)
                        setValueStr(e.target.value)
                        if (isValidDate(inputDate)) {
                            onChange(inputDate)
                            setMonth(inputDate)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                    className="bg-background pr-10 text-sm font-medium"
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
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={value}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                onChange(date)
                                setValueStr(formatDate(date))
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
