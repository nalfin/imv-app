import { Member } from '@/types/member'

const CardAnggota = ({ members }: { members: Member[] }) => {
    const total = members.length
    const active = members.filter((m) => m.status === 'ACTIVE').length
    const inactive = members.filter((m) => m.status === 'INACTIVE').length

    return (
        <div className="grid grid-cols-1 gap-6 font-mono md:grid-cols-3">
            <div className="bg-card text-card-foreground flex flex-col gap-3 border p-6 shadow-sm">
                <p className="text-muted-foreground text-sm">Total Anggota</p>
                <p className="text-2xl font-semibold">{total}/100</p>
            </div>
            <div className="bg-card text-card-foreground hidden flex-col gap-3 border p-6 shadow-sm md:flex">
                <p className="text-muted-foreground text-sm">Anggota Aktif</p>
                <p className="text-2xl font-semibold">{active}/100</p>
            </div>
            <div className="bg-card text-card-foreground hidden flex-col gap-3 border p-6 shadow-sm md:flex">
                <p className="text-muted-foreground text-sm">
                    Anggota Tidak Aktif
                </p>
                <p className="text-2xl font-semibold">{inactive}/100</p>
            </div>
        </div>
    )
}

export default CardAnggota
