import React, {useEffect, useState} from "react";
import Loading from "../widgets/loading/Loading";
import MyGraph from "../features/my_graph/MyGraph";
import Portfolio from "../widgets/portfolio/Portfolio";
import TransactionsHistory from "../widgets/transactions_history/TransactionsHistory";
import NotFoundPage from "./NotFoundPage";
import AppBar from "../shared/ui/app_bar/AppBar";
import Nav from "../shared/ui/nav/Nav";
import GroupFlex from "../shared/ui/group_flex/GroupFlex";
import Logo from "../shared/ui/logo/Logo";
import Block from "../shared/ui/block/Block";
import AddressSearch from "../features/address_serach/AddressSearch";
import NavLink from "../shared/ui/nav/NavLink";
import useToggle from "../shared/libs/hooks/useToggle";
import AboutProject from "../features/about_project/AboutProject";

export default function MainPage() {

    const [ addressInfoData, setAddressInfoData ] = useState([])
    const [ transactionsData, setTransactionsData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const [aboutModal, toggle] = useToggle()
    const [searchValue, setSearchValue] = useState('')

    async function getData() {
        setIsLoading(true)
        await fetch(`http://159.223.225.226:8080/api/v1/graph/0xB3764761E297D6f121e79C32A65829Cd1dDb4D32`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setAddressInfoData(result)
            })
        await fetch(`http://159.223.225.226:8080/api/v1/transaction/0xB3764761E297D6f121e79C32A65829Cd1dDb4D32/group?blockchain=ethereum&filter=with`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setTransactionsData(result)
            })
        setIsLoading(false)
    }

    useEffect(() => {
        getData()
    }, [])


    return(<>
        {aboutModal && <AboutProject onClose={toggle}/>}
        <AppBar padding={'10px'}>
            <Nav>
                <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                    <Logo />
                    <Block width={'60%'}>
                        <AddressSearch value={searchValue} onChange={setSearchValue} />
                    </Block>
                    <NavLink text={'About project'} onClick={toggle}/>
                </GroupFlex>
            </Nav>
        </AppBar>

        {isLoading ? (
            <Loading />
        ) : (
            (!addressInfoData || !transactionsData) ? (
                <NotFoundPage />
            ) : (
                <>
                    <MyGraph transactions={transactionsData} />
                    <Portfolio addressInfo={addressInfoData}/>
                    <TransactionsHistory transactions={transactionsData}/>
                </>
            )
        )}

    </>)
}