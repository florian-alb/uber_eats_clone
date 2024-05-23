import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {Product} from "@/types/product.ts";
import {formatDate} from "@/utils/order.ts";
import ConfirmationModal from "@/pages/dashboards/components/ConfirmationModal.tsx";
import {Badge} from "@/components/ui/badge.tsx";

export default function ProductsTable({products, onEditClick, onArchiveClick}: {
    products: Product[],
    onEditClick: (product: Product) => void,
    onArchiveClick: (product: Product) => void
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead>
                        Titre
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Description
                    </TableHead>
                    <TableHead>
                        Statut
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        Créé le
                    </TableHead>
                    <TableHead>
                        Prix
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                            <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={product.image ? product.image : "/assets/image_placeholder.png"}
                                width="64"
                            />
                        </TableCell>
                        <TableCell className="font-medium">
                            {product.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {product.description}
                        </TableCell>
                        <TableCell>
                            <Badge variant={product.isPublished ? "default" : "secondary"}>
                                {product.isPublished ? "Actif" : "Archivé"}
                            </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            {formatDate(product.createdAt)}
                        </TableCell>
                        <TableCell>
                            €{product.price}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <MoreHorizontal className="h-4 w-4"/>
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => onEditClick(product)}>Modifier</DropdownMenuItem>

                                    <ConfirmationModal
                                        description={`Voulez vous vraiement ${product.isPublished ? "archiver" : "publier"} ce produit?`}
                                        title={"Êtes vous sur?"}
                                        continueText={"Oui"}
                                        cancelText={"Non"}
                                        cancelChanges={() => onArchiveClick(product)}
                                    >
                                        <div
                                            className={"hover:bg-muted w-full flex-grow relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"}>
                                            {product.isPublished ? "Archiver" : "Publier"}
                                        </div>
                                    </ConfirmationModal>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}