import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import React, {useState} from "react";

export type TableColumn<T> = {
    columnDef: string;
    header: string;
    badge?: (element: T) => "default" | "secondary" | "constructive" | "destructive" | "outline" | null
    cell: (element: T) => string | number;
};

export default function DashboardTable<T>({columns, data, onRowClick}: {
    columns: TableColumn<T>[],
    data: Array<T>,
    onRowClick?: (row?: T, index?: number, event?: React.MouseEvent<HTMLTableRowElement>) => void
}) {
    const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(0);

    const handleRowClick = (row: T, index: number, event: React.MouseEvent<HTMLTableRowElement>) => {
        setClickedRowIndex(index);
        if (onRowClick) {
            onRowClick(row, index, event);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => {
                            if (index === 0) {
                                return <TableHead key={column.columnDef}>{column.header}</TableHead>
                            } else if (index === columns.length - 1) {
                                return <TableHead key={index} className="text-right">{column.header}</TableHead>
                            } else {
                                return <TableHead key={index} className="hidden sm:table-cell">{column.header}</TableHead>
                            }
                        }
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={index}
                              onClick={onRowClick ? (event) => handleRowClick(row, index, event) : undefined}
                              className={`${onRowClick ? "cursor-pointer" : ""} ${clickedRowIndex === index ? "bg-secondary" : ""}`}
                    >
                        {
                            columns.map((column, index) => {
                                if (column.badge) {
                                    return (
                                        <TableCell key={column.columnDef} className={"hidden sm:table-cell"}>
                                            <Badge className="text-xs" variant={column.badge(row)}>
                                                {column.cell(row)}
                                            </Badge>
                                        </TableCell>
                                    )
                                }

                                if (index === 0) {
                                    return (
                                        <TableCell key={index}>
                                            <div className={"font-medium"}>{column.cell(row)}</div>
                                        </TableCell>
                                    )
                                } else if (index === columns.length - 1) {
                                    return (
                                        <TableCell key={index}>
                                            <div className="text-right">{column.cell(row)}</div>
                                        </TableCell>
                                    )
                                } else {
                                    return (
                                        <TableCell key={index}>
                                            <div className="hidden md:table-cell">{column.cell(row)}</div>
                                        </TableCell>
                                    )
                                }
                            })
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}