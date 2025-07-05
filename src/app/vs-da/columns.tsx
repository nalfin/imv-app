'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { VSDA } from '@/types/vsda'

// helper untuk ambil header berdasarkan hari
function generateDynamicHeaders(startDate: string): string[] {
    const days = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6']
    const date = new Date(startDate)
    const day = date.getDay() // Minggu=0, Senin=1, ..., Sabtu=6
    const startIndex = day === 0 ? 6 : day - 1 // Jadi Senin=0, Minggu=6
    const rotated = [...days.slice(startIndex), ...days.slice(0, startIndex)]
    return rotated
}

export const getColumns = (
    onEdit: (vsdaData: VSDA) => void,
    referenceDate: string
): ColumnDef<VSDA>[] => {
    const headers = generateDynamicHeaders(referenceDate)

    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
            minSize: 40,
            maxSize: 40
        },
        {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Member Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            accessorKey: 'name',
            cell: ({ row }) => (
                <div className="ml-4">{row.getValue('name')}</div>
            )
        },
        {
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        HQ
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            accessorKey: 'hq',
            size: 80,
            minSize: 80,
            maxSize: 80,
            cell: ({ row }) => <div className="ml-4">{row.getValue('hq')}</div>
        },
        {
            header: headers[0],
            accessorFn: (row) => row.d1?.[0]?.value || '',
            size: 80,
            minSize: 80,

            cell: ({ row }) => {
                const raw = row.original.d1?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            header: headers[1],
            accessorFn: (row) => row.d2?.[0]?.value || '',
            size: 80,
            cell: ({ row }) => {
                const raw = row.original.d2?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            header: headers[2],
            accessorFn: (row) => row.d3?.[0]?.value || '',
            size: 80,
            cell: ({ row }) => {
                const raw = row.original.d3?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            header: headers[3],
            accessorFn: (row) => row.d4?.[0]?.value || '',
            size: 80,
            cell: ({ row }) => {
                const raw = row.original.d4?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            header: headers[4],
            accessorFn: (row) => row.d5?.[0]?.value || '',
            size: 80,
            cell: ({ row }) => {
                const raw = row.original.d5?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            header: headers[5],
            accessorFn: (row) => row.d6?.[0]?.value || '',
            size: 80,
            cell: ({ row }) => {
                const raw = row.original.d6?.[0]?.value || ''
                const match = raw.match(/\d+/) // ambil angka saja
                const number = match ? parseInt(match[0], 10) : null

                const bgColor =
                    number === null
                        ? 'bg-transparent'
                        : number >= 7
                          ? 'bg-green-600'
                          : 'bg-red-700'

                return (
                    <div
                        className={`${bgColor} w-full rounded px-2 py-1 text-center`}
                    >
                        {raw}
                    </div>
                )
            }
        },
        {
            id: 'percentage',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    %
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            accessorFn: (row) => {
                const values = [row.d1, row.d2, row.d3, row.d4, row.d5, row.d6]

                const total = values.reduce((sum, item) => {
                    const raw = item?.[0]?.value || ''
                    const match = raw.match(/\d+/)
                    const number = match ? parseInt(match[0], 10) : 0
                    return sum + number
                }, 0)

                return Math.round((total / 54) * 100)
            },
            size: 80,
            minSize: 80,
            maxSize: 80,
            cell: ({ getValue }) => {
                const percentage = getValue<number>()
                return <div className="ml-4 font-semibold">{percentage}%</div>
            }
        },
        {
            id: 'actions',
            size: 50,
            minSize: 50,
            maxSize: 50,
            cell: ({ row }) => {
                const vsdaData = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit(vsdaData)}>
                                Edit Poin DA
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>Edit Poin DA</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]
}
