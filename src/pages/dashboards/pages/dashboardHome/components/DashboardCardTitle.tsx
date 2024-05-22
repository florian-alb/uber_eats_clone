import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import TableFilter from "@/pages/dashboards/components/TableFilter.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {ArrowUpRightIcon} from "lucide-react";

export default function DashboardCardTitle({title, description, filters, seeAll}: {
    title: string,
    description: string,
    filters?: string[],
    seeAll?: { name: string, link: string}
}) {
    return (
        <CardHeader className="px-7">
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {filters && <TableFilter filters={filters}/>}
                {seeAll &&
                    <Button asChild className="ml-auto gap-1" size="sm">
                        <Link to={seeAll.link}>{seeAll.name}
                            <ArrowUpRightIcon className="h-4 w-4"/>
                        </Link>
                    </Button>
                }
            </div>
        </CardHeader>
    )
}