import { TrendingDown, TrendingUp } from 'lucide-react'

type CardSingleProps = {
    title: string
    content: string
    change?: number // optional
    subtitle?: string
}

const CardMemberSingle = ({
    title,
    content,
    change,
    subtitle
}: CardSingleProps) => {
    const isPositive = (change ?? 0) >= 0
    const Icon = isPositive ? TrendingUp : TrendingDown
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500'

    return (
        <>
            <div className="bg-card/50 text-card-foreground flex flex-col gap-4 rounded-md border p-6 shadow-sm">
                <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                        <p className="text-muted-foreground text-sm">{title}</p>
                        {change !== undefined && (
                            <span
                                className={`flex items-center gap-1 text-sm ${changeColor} border-border rounded-sm border px-2 py-1`}
                            >
                                <Icon className="h-4 w-4" />
                                {Math.abs(change)}%
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-2xl font-semibold">
                        {content}
                    </div>
                </div>
                {subtitle && (
                    <p className="text-muted-foreground text-xs">{subtitle}</p>
                )}
            </div>
        </>
    )
}

export default CardMemberSingle
