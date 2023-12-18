import React, {useContext, useEffect, useMemo, useState} from 'react';

import Logger from '../../../shared/libs/internal/Logger';

import SignIn from '../../../features/auth/signin/Signin';
import SendActivationMail from "../../../features/auth/activation_send/SendActivationMail";

import Card from '../../../shared/ui/card/Card';
import CardHeader from '../../../shared/ui/card/CardHeader';
import CardBody from '../../../shared/ui/card/CardBody';
import CardFooter from '../../../shared/ui/card/CardFooter';
import TextWithLink from '../../../shared/ui/text_with_link/TextWithLink'
import Block from "../../../shared/ui/block/Block";
import AppContainer from "../../AppContainer";
import {useAppContext} from "../../../app/provider/AppContextProvider";
import Typography from "../../../shared/ui/typography/Typography";
/*
* 1) Не всегда при OAuth2 имеется имя, а в приложении хотелось бы иметь имя всегда.
* Для этого нужно, если нет имени пользователя, перенаправлять на страницу
* */
/**
 * type: [signin, sendActivationMail]
 * */
const Authentication = () => {

    // const navigate = useNavigate();
    const { setError, authState, isAuth,status } = useAppContext();

    // const logger = useMemo(()=>new Logger('Authentication'), []);

    const [tabType, setTabType] = useState('signin');

    useEffect(() => {
        if (authState.type === 'signin') {
            setTabType('signin')
        } else if (authState.type === 'signup') {
            setTabType('signup')
        } else {
            setTabType('signin')
        }
    }, []);

    if (isAuth) {
        return window.location.replace('/');
    } else {

        // SignUp/SignIn должны быть в одном компоненте и OAuth тоже, все должно быть в одном Authentication page
        return (<AppContainer isBoxCentered={true} isContainer={true}>

            <Block isAlignCenter={true} top={60}>
                <Card maxWidth={600}>
                    <CardHeader>
                        {/*<Logo />*/}
                        <Block isAlignCenter={true}>
                            {tabType === 'signup' && <Typography align={'center'} size={28} weight={600}>Регистрация</Typography>}
                            {tabType === 'signin' && <Typography align={'center'} size={28} weight={600}>Войти в клуб</Typography>}
                        </Block>
                    </CardHeader>

                    <CardBody>
                        {tabType === 'signup' && <SignIn />}
                        {tabType === 'signin' && <SignIn />}
                        <br />
                        {/*<Button variant='second'><a href={"/auth/azure"}>OpenID Connect</a></Button>*/}
                    </CardBody>

                    <CardFooter>
                        {tabType === 'signup' && status === null && <TextWithLink text="Уже есть аккаунт?" linktext="Авторизация" onClick={() => {
                            setTabType('signin');
                            setError('')
                        }} />}
                        {tabType === 'signin' && status === null && <>
                            <TextWithLink text="Нет аккаунта?" linktext="Регистрация" onClick={() => {
                                setTabType('signup');
                                setError('')
                            }} />
                            {/*<br/>*/}
                            {/*<TextWithLink linktext="Забыли пароль?" onClick={e => navigate('/authn/send-reset')} />*/}
                        </>}
                    </CardFooter>
                </Card>
            </Block>

        </AppContainer>);
    }

}

export default Authentication

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
