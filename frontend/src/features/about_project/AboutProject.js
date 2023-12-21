import React from "react";
import Modal from "../../shared/ui/modal/Modal";
import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";

export default function AboutProject({onClose=f=>f}) {

    return (<Modal maxWidth={1000} minWidth={600} onClose={onClose}>
        <Block isAlignCenter={true} bottom={40}>
            <Typography color={'black'} weight={900} size={24} bottom={12}>Koresha Team</Typography>
            <p>Some text about this project</p>
        </Block>
        <Button variant={'outline'} onClick={onClose}>Close</Button>
    </Modal>)
}