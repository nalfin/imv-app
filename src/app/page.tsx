'use client'

import LayoutPages from '@/components/layout'
import { useEffect, useState } from 'react'
import CardMemberDynamic from './member/card-member-dynamic'
import { FullScreenLoader } from '@/components/fullscreen-loader'
import { fetchMemberSummary } from '@/lib/api/member/get-member-summary'
import HomeEventPage from '@/components/home-component/events/home-event-page'
import HomeVSDAPage from '@/components/home-component/vs-da/home-vsda-page'
import { Separator } from '@/components/ui/separator'

export default function Home() {
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        try {
            setLoading(true)
            const members = await fetchMemberSummary()
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

    return (
        <LayoutPages>
            {loading && <FullScreenLoader />}
            <div className="grid grid-cols-1 gap-6">
                <CardMemberDynamic />
                <div className="grid grid-cols-1 gap-6 font-mono lg:grid-cols-4">
                    <div className="col-span-2">
                        <HomeVSDAPage />
                    </div>
                    <div className="col-span-2">
                        <HomeEventPage />
                    </div>
                </div>
            </div>
        </LayoutPages>
    )
}
