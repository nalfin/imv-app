'use client'

import LayoutPages from '@/components/layout'
import CardAnggota from '../card-anggota'
import MemberTable from './member-table'
import { useEffect, useState } from 'react'
import { Member } from '@/types/member'

const DashboardPage = () => {
    const [data, setData] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)

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

    console.log(data)

    return (
        <LayoutPages>
            <CardAnggota members={data} />
            <MemberTable data={data} fetchData={fetchData} loading={loading} />
        </LayoutPages>
    )
}

export default DashboardPage
