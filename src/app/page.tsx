import LayoutPages from '@/components/layout'
import CardAnggota from './card-anggota'

export default function Home() {
    return (
        <LayoutPages>
            <div className="grid grid-cols-1 gap-10">
                {/* <CardAnggota  /> */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">tabel anggota</div>
                    <div className="col-span-1">Event</div>
                </div>
            </div>
        </LayoutPages>
    )
}
