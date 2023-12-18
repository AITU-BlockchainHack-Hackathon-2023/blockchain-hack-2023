import React, {useEffect} from "react";
import Modal from "../../shared/ui/modal/Modal";
import TelegramAttach from "./TelegramAttach";
import useToggle from "../../shared/libs/hooks/useToggle";

export default function TelegramAttachModal({onClose}) {

    return (<>
        <Modal minWidth={340} maxWidth={600} onClose={onClose}>
            <TelegramAttach onClose={onClose} />
        </Modal>
    </>)
}