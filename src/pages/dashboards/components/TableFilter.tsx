import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ListFilter} from "lucide-react";
import {useState} from "react";


export default function TableFilter({filters}: { filters: string[] }) {
    const [filter, setFilter] = useState(filters[0])

    function changeFilter(index : number){
        setFilter(filters[index])
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                >
                    <ListFilter className="h-3.5 w-3.5"/>
                    <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {filters.map((filterName, index) => (
                    <DropdownMenuCheckboxItem checked={filter === filters[index]}
                                              onClick={() => changeFilter(index)}
                                              key={index}>{filterName}</DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}