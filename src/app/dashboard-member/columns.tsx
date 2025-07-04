'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Member } from '@/types/member'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export const getColumns = (
    onEdit: (member: Member) => void,
    onDelete: (id: string) => Promise<void>
): ColumnDef<Member>[] => {
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
            enableHiding: false
        },
        {
            accessorKey: 'name',
            header: 'Member Name'
        },
        {
            accessorKey: 'lvl',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Level HQ
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        {
            accessorKey: 'role',
            header: 'Role'
        },
        {
            accessorKey: 'trop',
            header: 'Trops'
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue<'ACTIVE' | 'INACTIVE'>('status')
                return (
                    <span
                        className={`inline-block w-20 rounded py-1 text-center text-xs font-semibold text-white ${
                            status === 'ACTIVE' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                    >
                        {status}
                    </span>
                )
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const member = row.original
                const [loading, setLoading] = useState(false)

                const handleDelete = async () => {
                    const confirmDelete = confirm(
                        `Yakin ingin menghapus ${member.name}?`
                    )
                    if (!confirmDelete) return

                    setLoading(true)
                    try {
                        await onDelete(member.id)
                    } finally {
                        setLoading(false)
                    }
                }

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="font-mono">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(member.name)
                                }
                            >
                                Copy Name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit(member)}>
                                Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleDelete}
                                className="text-red-600 focus:text-red-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Deleting...</span>
                                    </div>
                                ) : (
                                    'Hapus Member'
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]
}
