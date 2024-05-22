import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import React from "react";

export interface CardData {
    title: string;
    currentMonthStat: number | string;
    todayStat?: number | string;
    currency?: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function CardStatistics({cardData}: { cardData: CardData[] }) {

    return (
        <div className={`grid gap-4 sm:grid-cols-${cardData.length} xl:grid-cols-${cardData.length}`}>
            {
                cardData.map((data, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
                                <data.icon className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{data.currentMonthStat}{data.currency}</div>
                                <p className="text-xs text-muted-foreground">+ {data.todayStat} aujourd'hui</p>
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>
    )
}