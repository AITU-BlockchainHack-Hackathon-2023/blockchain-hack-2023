import React, {useEffect, useState} from "react";
import Loading from "../widgets/loading/Loading";
import MyGraph from "../features/my_graph/MyGraph";
import Portfolio from "../widgets/portfolio/Portfolio";
import TransactionsHistory from "../widgets/transactions_history/TransactionsHistory";

export default function MainPage() {

    const [ addressInfoData, setAddressInfoData ] = useState([])
    const [ transactionsData, setTransactionsData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

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

    if (isLoading) return <Loading />

    return(<>
        <MyGraph transactions={transactionsData} />
        <Portfolio addressInfo={addressInfoData}/>
        <TransactionsHistory transactions={transactionsData}/>
        {/*<GraphVis data={data?.transactions}/>*/}
        {/*<AddressInfo addressInfo={data}/>*/}
        {/*<TimelineChart transactionsData={data?.transactions}/>*/}
    </>)
}