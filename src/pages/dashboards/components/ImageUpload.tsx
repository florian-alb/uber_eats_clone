import {useCallback, useEffect, useRef, useState} from "react";
import * as LR from '@uploadcare/blocks';
import "@uploadcare/blocks/web/lr-file-uploader-regular.min.css";
import {OutputFileEntry} from "@uploadcare/blocks";

LR.registerBlocks(LR);

type FileUploaderProps = {
    file: Pick<OutputFileEntry, | "uuid" | "cdnUrl">;
    onChange: (file: Pick<OutputFileEntry, | "uuid" | "cdnUrl">) => void;
}

export default function ImageUpload({file, onChange}: FileUploaderProps) {
    const [uploadedFiles, setUploadedFiles] = useState<Pick<OutputFileEntry, | "uuid" | "cdnUrl">>();
    const ctxProviderRef = useRef<InstanceType<LR.UploadCtxProvider>>(null);

    const handleRemoveClick = useCallback(
        () => onChange({uuid: file.uuid, cdnUrl: "/assets/image_placeholder.png"}),
        [file, onChange],
    );

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const handleChangeEvent = (e: LR.EventMap['change']) => {
            setUploadedFiles(e.detail.successEntries[0]);
        };
        ctxProvider.addEventListener('change', handleChangeEvent);
        return () => {
            ctxProvider.removeEventListener('change', handleChangeEvent);
        };
    }, [setUploadedFiles]);


    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;
        const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

        const handleModalCloseEvent = () => {
            resetUploaderState();
            onChange(uploadedFiles as Pick<OutputFileEntry, | "uuid" | "cdnUrl">);
            setUploadedFiles(undefined);
        };
        ctxProvider.addEventListener('modal-close', handleModalCloseEvent);

        return () => {
            ctxProvider.removeEventListener('modal-close', handleModalCloseEvent);
        };
    }, [file, onChange, uploadedFiles, setUploadedFiles]);

    return (
        <div>
            <lr-config
                ctx-name="profile-uploader"
                pubkey="d182ad1a4cbd8cd0236f"
                sourceList="local, url"
                multiple={false}
                imgOnly={true}
            ></lr-config>
            <lr-file-uploader-regular
                ctx-name="profile-uploader"
                class="uploadcare-config"
            ></lr-file-uploader-regular>
            <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="profile-uploader"/>

            <div>
                {file ?
                    <div className={"relative"}>
                        <img
                            className="aspect-square w-full rounded-md object-cover"
                            key={file.uuid}
                            src={file.cdnUrl?.includes("http") ? `${file.cdnUrl}/` : "/assets/image_placeholder.png"}
                            height="300"
                            width="300"
                            alt="profile image"
                            title="profile image"
                        />


                        <button
                            className={"-right-2 -top-2 size-6 text-sm absolute bg-muted rounded-full" + `${file.cdnUrl?.includes("http") ? "" : " hidden"}`}
                            type="button"
                            onClick={() => handleRemoveClick()}
                        >×
                        </button>
                    </div>

                    :
                    <img
                        className="aspect-square w-full rounded-md object-cover"
                        src="/assets/image_placeholder.png"
                        height="300"
                        width="300"
                        alt="restaurant_image"
                    />
                }
            </div>
        </div>
    )
}