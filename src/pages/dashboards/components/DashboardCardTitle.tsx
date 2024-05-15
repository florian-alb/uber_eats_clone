import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import TableFilter from "@/pages/dashboards/components/TableFilter.tsx";

export default function DashboardCardTitle({title, description, filters}: { title: string, description: string, filters?: string[] }) {
    return (
        <CardHeader className="px-7">
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {filters && <TableFilter filters={filters}/>}
            </div>
        </CardHeader>
    )
}