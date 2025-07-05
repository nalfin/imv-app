'use client'

import LayoutPages from '@/components/layout'
import VSDATable from './vsda-table'
import { useEffect, useState } from 'react'
import { fetchVSDA } from '@/lib/api/vsda/get-vsda'
import { VSDA } from '@/types/vsda'
import { FullScreenLoader } from '@/components/fullscreen-loader'
import { fetchVSDAWithCache } from '@/lib/api/vsda/get-vsda-with-cache'

function formatDateToDDMM(date: Date | undefined): string {
    if (!date) return ''
    const d = date.getDate().toString().padStart(2, '0')
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${d}/${m}`
}

function parseDateFromStorage(value: string | null): Date | undefined {
    if (!value) return undefined
    const date = new Date(value)
    return isNaN(date.getTime()) ? undefined : date
}

const VsDAPage = () => {
    const [data, setData] = useState<VSDA[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined
    )

    // Ambil tanggal terakhir dari localStorage saat pertama load
    useEffect(() => {
        const storedDateStr = localStorage.getItem('vsda-selected-date')
        const storedDate = parseDateFromStorage(storedDateStr)

        const initDate = storedDate ?? new Date()
        setSelectedDate(initDate)
        getData(initDate)
    }, [])

    // Setiap selectedDate berubah, fetch data & simpan ke localStorage
    useEffect(() => {
        if (!selectedDate) return

        localStorage.setItem('vsda-selected-date', selectedDate.toISOString())
        getData(selectedDate)
    }, [selectedDate])

    const getData = async (date?: Date) => {
        try {
            setLoading(true)
            const formatted = formatDateToDDMM(date ?? selectedDate)
            const vsda = await fetchVSDAWithCache(formatted)

            setData(vsda)
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Gagal mengambil data')
        } finally {
            setLoading(false)
        }
    }

    return (
        <LayoutPages>
            {loading && <FullScreenLoader />}
            <div>Judul</div>
            <VSDATable
                data={data}
                fetchData={() => getData(selectedDate)}
                loading={loading}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
        </LayoutPages>
    )
}

export default VsDAPage
