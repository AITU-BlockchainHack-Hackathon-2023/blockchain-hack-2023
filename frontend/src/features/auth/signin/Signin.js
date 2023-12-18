import React, {useState, useEffect, useMemo, useContext} from 'react';

import {useAppContext} from "../../../app/provider/AppContextProvider";
import useTimer from "../../../shared/libs/helpers/useTimer";

import Input from '../../../shared/ui/input/Input';
import Button from '../../../shared/ui/button/Button';
import Loading from "../../../widgets/loading/Loading";
import GroupInput from "../../../shared/ui/group_input/GroupInput";
import Overlay from "../../../shared/ui/overlay/Overlay";
import Link from "../../../shared/ui/link/Link";
import Block from "../../../shared/ui/block/Block";

/**
 * SignIn должен работать также, как и OAuth Azure Ad перенаправлять на link и redirect-ить на /?authenticated=Boolean,
 * SignUp не должен перенаправлять, а только возвращать json о том, получилось ли создать нового пользователя или нет.
 * */
export default function SignIn({ }){

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('')

    const {status, setStatus, isLoading, error, setError, login, checkCode, authState, setAuthState, timeOut, setTimeOut} = useAppContext();
    const [message, setMessage] = useState('');

    const {seconds, isRunning, startTimer} = useTimer()
    const [isTryLink, setIsTryLink] = useState(false);
    const timeOutConfig = 60; // seconds for timeout

    // useEffect(() => {
    //     if (error !== '') {
    //     }
    // }, []);

    useEffect(() => {
        if (timeOut) {
            startTimer(timeOutConfig)
        }
    }, [timeOut])

    useEffect(() => {
        if (!isRunning) {
            setTimeOut(false)
        }
    }, [isRunning])

    function loginA(e) {
        e.preventDefault();

        if (status) {
            const numericRegex = /^[0-9]+$/;
            const isNumericValid = numericRegex.test(code);
            if (code === '') {
                return setMessage('Введите код активации, отправленный на почту')
            } else if (!isNumericValid) {
                return setMessage('Код должен состоять из цифр')
            } else if (code.length !== 6) {
                return setMessage('Код должен состоять из 6ти цифр')
            }

            checkCode(authState.email,code);
        }
    }

    function sendCode(e) {
        e.preventDefault();

        setMessage('')
        setError('')

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailValid = emailRegex.test(email);
        if (email === '') {
            return setMessage('Введите email')
        } else if (!isEmailValid) {
            return setMessage('Введите валидный email')
        }

        setAuthState({
            ...authState,
            email,
        });

        login(email);
    }

    function sentTry() {
        console.log('TRY', authState.email, email)
        if (authState.email) {
            login(authState.email);
        }
    }

    function cancel() {
        setStatus(null);
        setMessage('');
    }


    return (
        <div className="">
            {isLoading && <Overlay><Loading /></Overlay>}
            {error && <p>{error} <br/><br/> </p>}
            {message && <p>{message} <br/><br/> </p>}
            <form>
                {!status && <>
                    <div>
                        <label>Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            placeHolder='Введите email'
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {seconds < 1 &&
                        <Button type={'submit'} onClick={sendCode}>Продолжить</Button>
                    }
                </>}

                {status && <>
                    <div>
                        <label>Verification code</label>
                        <Input
                            type="number"
                            name="verificationCode"
                            value={code}
                            placeHolder='Введите код из почты'
                            onChange={e => setCode(e.target.value)}
                            required
                        />
                    </div>
                        <GroupInput>
                            <Button onClick={cancel} variant={'cancel'}>Отменить</Button>

                            { /* показывать кнопку только когда код полностью ввели*/ }
                            <Button type={'submit'} onClick={loginA}>Подтвердить</Button>

                        </GroupInput>
                        <br/>
                        {!isRunning && <Block isAlignCenter={true}>
                            <Link onClick={sentTry} text={'Отправить код повторно'} />
                        </Block>
                        }
                </>}
                { seconds > 0 &&
                    <p>Повторный запрос можно отправить через {seconds} секунд <br/></p>
                }
            </form>
        </div>
    );
}

