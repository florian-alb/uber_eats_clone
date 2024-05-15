import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export type TableRow = {
    row: TableCell[]
}

export type TableCell = {
    column: string;
    isBadge: boolean;
    badgeVariant: "default" | "secondary" | "constructive" | "destructive" | "outline" | null | undefined
    name: string;
}

export default function DashboardTable({columns, data}: { columns: string[], data: TableRow[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((name, index) => {
                            if (index === 0) {
                                return <TableHead key={index}>{name}</TableHead>
                            } else if (index === columns.length - 1) {
                                return <TableHead key={index} className="text-right">{name}</TableHead>
                            } else {
                                return <TableHead key={index} className="hidden sm:table-cell">{name}</TableHead>
                            }
                        }
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((rows, index) => {
                    return (
                        <TableRow key={index}>
                            {
                                rows.row.map((cell, index) => {
                                    if (cell.isBadge) {
                                        return (
                                            <TableCell key={index} className={"hidden sm:table-cell"}>
                                                <Badge className="text-xs" variant={cell.badgeVariant}>
                                                    {cell.name}
                                                </Badge>
                                            </TableCell>
                                        )
                                    }

                                    if (index === 0) {
                                        return (
                                            <TableCell key={index}>
                                                <div className={"font-medium"}>{cell.name}</div>
                                            </TableCell>
                                        )
                                    } else if (index === columns.length - 1) {
                                        return (
                                            <TableCell key={index}>
                                                <div className="text-right">{cell.name}</div>
                                            </TableCell>
                                        )
                                    } else {
                                        return (
                                            <TableCell key={index}>
                                                <div className="hidden md:table-cell">{cell.name}</div>
                                            </TableCell>
                                        )
                                    }
                                })
                            }
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}