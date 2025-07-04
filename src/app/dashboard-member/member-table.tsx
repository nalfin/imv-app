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
    loading
}: {
    data: Member[]
    fetchData: () => void
    loading: boolean
}) {
    const [selectedMember, setSelectedMember] = useState<Member | null>(null)
    const [editOpen, setEditOpen] = useState(false)

    const [showFromLast, setShowFromLast] = useState(false)

    const handleEdit = (member: Member) => {
        setSelectedMember(member)
        setEditOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}?action=deleteMember&id=${id}`,
                {
                    method: 'GET'
                }
            )
            const result = await res.json()
            if (result.success) {
                // alert('✅ Member berhasil dihapus')
                fetchData() // Refresh data
            } else {
                alert('❌ Gagal menghapus: ' + result.message)
            }
        } catch (error) {
            alert('❌ Terjadi kesalahan koneksi')
            console.error(error)
        }
    }

    const columns = getColumns(handleEdit, handleDelete)

    return (
        <div className="grid gap-10">
            <DataTable<Member, unknown>
                columns={columns}
                data={showFromLast ? [...data].reverse() : data}
                onSuccess={fetchData}
                showFromLast={showFromLast}
                setShowFromLast={setShowFromLast}
            />

            {loading && <p className="text-sm">⏳ Loading data...</p>}
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
