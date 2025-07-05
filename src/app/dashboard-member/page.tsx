'use client'

import LayoutPages from '@/components/layout'
import CardAnggota from '../card-anggota'
import MemberTable from './member-table'
import { useEffect, useState } from 'react'
import { Member } from '@/types/member'
import { FullScreenLoader } from '@/components/fullscreen-loader'
import { fetchMembers } from '@/lib/api/member/get-member'

const DashboardPage = () => {
    const [data, setData] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)

    const getData = async () => {
        try {
            setLoading(true)
            const members = await fetchMembers()
            setData(members)
        } catch (err) {
            console.error('Fetch error:', err)
            alert('Gagal mengambil data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
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
                getData()
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
            <div className="space-y-3">
                <CardAnggota members={data} />
                <MemberTable
                    data={data}
                    fetchData={getData}
                    loading={loading}
                    onDelete={handleDelete}
                />
            </div>
        </LayoutPages>
    )
}

export default DashboardPage
