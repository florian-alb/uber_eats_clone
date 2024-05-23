import {Button} from "@/components/ui/button.tsx";
import {FormEvent, useState} from "react";

interface Event<T = EventTarget> {
    target: T;
}

export default function ImageUpload() {
    const [file, setFile] = useState<FileList>()

    function changeFile(event: Event) {
        const target = event.target as HTMLInputElement;
        setFile(target.files ? target.files : undefined);
    }

    return (
        <div>
            <div>
                <form>
                    <input type="file" onChange={changeFile}/>
                    <Button type="submit">Upload</Button>
                </form>
            </div>
        </div>
    )
}