'use client'

import LayoutPages from '@/components/layout'
import CardAnggota from './card-anggota'
import { useEffect, useState } from 'react'
import { Member } from '@/types/member'
import { fetchMembers } from '@/lib/api/member/get-member'

export default function Home() {
    const [data, setData] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            setLoading(true)
            const members = await fetchMembers()
            setData(members)
            localStorage.setItem('members-data', JSON.stringify(members))
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Gagal mengambil data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const saved = localStorage.getItem('members-data')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (Array.isArray(parsed)) {
                    setData(parsed)
                    setLoading(false)
                }
            } catch (err) {
                console.error('Error parsing saved data:', err)
            }
        }

        // Ambil data terbaru dari server
        getData()
    }, [])

    return (
        <LayoutPages>
            <div className="grid grid-cols-1 gap-10">
                <CardAnggota members={data} />
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">tabel anggota</div>
                    <div className="col-span-1">Event</div>
                </div>
            </div>
        </LayoutPages>
    )
}
