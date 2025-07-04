'use client'

import { useEffect, useState } from 'react'
import { Member } from '@/types/member'
import { DataTable } from './data-table'
import { getColumns } from './columns'
import { DialogAddMember } from './dialog-add'
import { DialogEditMember } from './dialog-edit'

export default function MemberTable({
    data,
    fetchData,
    loading,
    onDelete
}: {
    data: Member[]
    fetchData: () => void
    loading: boolean
    onDelete: (id: string) => Promise<void>
}) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null)
    const [editOpen, setEditOpen] = useState(false)
    const [showFromLast, setShowFromLast] = useState(false)

    const handleEdit = (member: Member) => {
        setSelectedMember(member)
        setEditOpen(true)
    }

    const columns = getColumns(handleEdit, onDelete)

    return (
        <div className="grid gap-10">
            <DataTable<Member, unknown>
                columns={columns}
                data={showFromLast ? [...data].reverse() : data}
                onSuccess={fetchData}
                showFromLast={showFromLast}
                setShowFromLast={setShowFromLast}
            />

            {selectedMember && (
                <DialogEditMember
                    member={selectedMember}
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    onSuccess={fetchData}
                />
            )}
        </div>
    )
}
