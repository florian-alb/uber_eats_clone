import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {MapPin} from "lucide-react";

export default function ModalContent({address}: { address: string | null }) {
    const navigate = useNavigate();

    const closeModal = () => {
        navigate(-1);
    };

    function handleClick() {
        navigate('/address/edit')
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Détails de la livraison</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className={"flex gap-3"}>
                    <MapPin className={"size-7"}/>
                    <p className={"line-clamp-2"}>{address}</p>
                    <Button onClick={handleClick}
                            className={"bg-border text-black rounded-full hover:text-secondary"}>Modifier</Button>
                </div>
            </div>
            <DialogFooter>
                <Button className={"w-full"} onClick={closeModal}>Terminé</Button>
            </DialogFooter>
        </DialogContent>
    )
}