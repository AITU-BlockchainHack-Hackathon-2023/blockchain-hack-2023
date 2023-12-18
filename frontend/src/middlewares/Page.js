import React, {Fragment, useContext, useEffect, useMemo} from 'react';

// import {useAppContext} from "../context/AppContext";

import Logger from '../shared/libs/internal/Logger';
import Alert from "../shared/ui/alert/Alert";
import Loading from "../widgets/loading/Loading";
// import {Context} from "../index";

/**
 * Скопировано из ProtectedPage.js
 * */
const Page = ({ children }) => {

    const logger = useMemo(()=>new Logger('ProtectedPage'), []);

    const { authHandler, adaptiveHandler } = useAppContext();
    // const { user, isAuthenticated, userLoading, isOffline } = authHandler;
    const { device } = adaptiveHandler;


    // const {store} = useContext(Context);

    // if(device !== 'mobile' && (!isAuthenticated || isAuthenticated && user.role !== 'admin')){
    //     return <>
    //         <Modal minWidth={360} maxWidth={400}>
    //             <Block isAlignCenter={true}>
    //                 <Typography weight={700} size={24} bottom={12}>Адаптация в разработке</Typography>
    //                 <Typography weight={500} size={16} color={'#65727D'} align={'center'}>Пожалуйста, перейдите на ваше мобильное устройство, чтобы воспользоваться всеми функциями.</Typography>
    //             </Block>
    //         </Modal>
    //     </>
    // }

    // // Если был залогинен, то мы не дергаем страницу.
    // if (!store.isAuth) {
    //     console.log(store.isAuth, store.user)
    //     return (<>
    //         <Alert variant={'danger'}>
    //             <p>не авторизован</p>
    //         </Alert>
    //         {children}
    //     </>);
    // } else {
    //     return (<>
    //         {children}
    //     </>);
    // }
    // if(isOffline){
    //     // pop-up окно должно быть
    //     return (<>
    //         <Alert variant={'danger'}>
    //             <p>offline</p>
    //         </Alert>
    //         {children}
    //     </>);
    // }
    // else if(userLoading){
    //     console.log("Page.js: user loading")
    //     // pop-up
    //     return (<>
    //         <Loading />
    //         {children}
    //     </>);
    // }
    // else {
    //     return (<>
    //         {children}
    //     </>);
    // }

}
export default Page