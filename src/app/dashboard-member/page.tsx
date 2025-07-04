'use client'

import LayoutPages from '@/components/layout'
import CardAnggota from '../card-anggota'
import MemberTable from './member-table'
import { useEffect, useState } from 'react'
import { Member } from '@/types/member'
import { FullScreenLoader } from '@/components/fullscreen-loader'

const DashboardPage = () => {
    const [data, setData] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}?action=readMember`
        )
        const result = await res.json()

        if (result.success) {
            const mapped = result.data.map((item: any, index: number) => ({
                id: item.id,
                name: item.name,
                lvl: parseInt(item.lvl),
                role: item.role,
                trop: item.trop,
                status: item.status
            }))
            setData(mapped)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id: string) => {
        setDeleting(true)
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}?action=deleteMember&id=${id}`,
                {
                    method: 'GET'
                }
            )
            const result = await res.json()
            if (result.success) {
                fetchData()
            } else {
                alert('❌ Gagal menghapus: ' + result.message)
            }
        } catch (error) {
            console.error(error)
            alert('❌ Terjadi kesalahan koneksi')
        }
        setDeleting(false)
    }

    return (
        <LayoutPages>
            {(loading || deleting) && <FullScreenLoader />}
            <CardAnggota members={data} />
            <MemberTable
                data={data}
                fetchData={fetchData}
                loading={loading}
                onDelete={handleDelete}
            />
        </LayoutPages>
    )
}

export default DashboardPage
