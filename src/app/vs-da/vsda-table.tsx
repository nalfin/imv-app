'use client'

import { useState } from 'react'
import { DataTable } from './data-table'
import { getColumns } from './columns'
import { VSDA } from '@/types/vsda'
import DialogEditVSDA from './dialog-edit'

interface VSDATableProps {
    data: VSDA[]
    fetchData: () => void
    loading: boolean
    selectedDate: Date | undefined
    setSelectedDate: (date: Date | undefined) => void
}

export default function VSDATable({
    data,
    fetchData,
    loading,
    selectedDate,
    setSelectedDate
}: VSDATableProps) {
    const [selectedVSDA, setSelectedVSDA] = useState<VSDA[]>([])
    const [editOpen, setEditOpen] = useState(false)
    const [showFromLast, setShowFromLast] = useState(false)
    const referenceDate = data?.[0]?.d1?.[0]?.date || ''
    const [selectedMultiple, setSelectedMultiple] = useState<VSDA[]>([])

    const handleEdit = (vsda: VSDA) => {
        setSelectedVSDA([vsda]) // bungkus satu item ke dalam array
        setEditOpen(true)
    }

    const handleBulkEdit = (rows: VSDA[]) => {
        setSelectedVSDA(rows) // langsung set semua rows terpilih
        setEditOpen(true)
    }

    const columns = getColumns(handleEdit, referenceDate)

    return (
        <div className="grid gap-10">
            <DataTable<VSDA, unknown>
                columns={columns}
                data={showFromLast ? [...data].reverse() : data}
                onSuccess={fetchData}
                showFromLast={showFromLast}
                setShowFromLast={setShowFromLast}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                onBulkEdit={handleBulkEdit}
            />

            {selectedVSDA && (
                <DialogEditVSDA
                    vsdaData={selectedVSDA}
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    onSuccess={fetchData}
                />
            )}
        </div>
    )
}
