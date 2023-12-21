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
import Typography from "../shared/ui/typography/Typography";

export default function MainPage() {

    const [ addressInfoData, setAddressInfoData ] = useState([])
    const [ transactionsData, setTransactionsData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const [aboutModal, toggle] = useToggle()
    const [searchValue, setSearchValue] = useState('')
    const [addressValueFroGraph, setAddressValueFroGraph] = useState('')

    async function getData() {
        setIsLoading(true)
        await fetch(`http://159.223.225.226:8080/api/v1/graph/${searchValue}`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setAddressInfoData(result)
                setAddressValueFroGraph(searchValue)
            })
        await fetch(`http://159.223.225.226:8080/api/v1/transaction/${searchValue}/group?blockchain=ethereum&filter=with`)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setTransactionsData(result)
                setAddressValueFroGraph(searchValue)
            })
        setIsLoading(false)
    }

    return(<>
        {aboutModal && <AboutProject onClose={toggle}/>}
        <AppBar padding={'10px'}>
            <Nav>
                <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                    <Logo />
                    <Block width={'60%'}>
                        <AddressSearch value={searchValue} onChange={setSearchValue} onSubmit={getData} />
                    </Block>
                    <NavLink text={'About project'} onClick={toggle}/>
                </GroupFlex>
            </Nav>
        </AppBar>

        {isLoading ? (
            <Loading />
        ) : (
            (!addressInfoData || !transactionsData
                || addressInfoData?.message ==='get transactions: error in request'
                || transactionsData?.message ==='get transactions: error in request'
                ) ? (
                <Block isAlignCenter={true} isCenteredByY={true}>
                    <Typography size={28} weight={700}>Address Not Found</Typography>
                </Block>
            ) : (
                <>
                    <MyGraph transactions={transactionsData} address={addressValueFroGraph} />
                    {addressValueFroGraph &&  <>
                        <Portfolio addressInfo={addressInfoData}/>
                        <TransactionsHistory transactions={transactionsData}/>
                    </>}
                </>
            )
        )}

    </>)
}