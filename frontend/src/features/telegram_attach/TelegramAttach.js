import React, {useEffect, useState} from "react";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import Button from "../../shared/ui/button/Button";
import {useAppContext} from "../../app/provider/AppContextProvider";
import {useNavigate} from "react-router-dom";
export default function TelegramAttach({onClose=f=>f}) {

    const {user} = useAppContext()
    const [tg_startHash, setTgStartHash] = useState(user.tg_startHash)

    function onClick() {
        onClose()
    }

    return (<>
        <Block isAlignCenter={true} bottom={20}>
            <Typography align={'center'} size={24} weight={700}>Подтвердите свой telegram аккаунт</Typography>
        </Block>
        <Block isAlignCenter={true} bottom={40}>
            <Typography align={'center'} size={18} weight={500}>Чтобы избежать накрутки значений не членами клуба</Typography>
        </Block>
        <Block>
            <Button onClick={() => window.open(`https://t.me/aitubookclub_bot?start=${tg_startHash}`)} isBgLight={true} bottom={10}>Привязать telegram аккаунт</Button>
            <Button onClick={onClick} variant={'cancel'}>Закрыть</Button>
        </Block>
    </>)

}