import React, {useEffect, useState} from "react";
import TransactionCard from "../../features/transaction_card/TransactionCard";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
import Card from "../../shared/ui/card/Card";
import CardBody from "../../shared/ui/card/CardBody";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Button from "../../shared/ui/button/Button";

import styles from './transactionsHistory.module.css'

export default function TransactionsHistory({transactions=[]}) {

    useEffect(() => {
        console.log('TRANSACTIONS',transactions)
    }, []);

    const [isShowAll, setIsShowAll] = useState(true)
    // const [transactions, setTransactions] = useState([])

    return (<div className={styles.TransactionsHistory}>
        <Card maxWidth={500} minWidth={400}>
            <CardBody>
                <Block>
                    <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                        <Typography color={'black'} weight={800} size={21}>Transactions history</Typography>
                        <Button size={'small'} width={'fit-content'} variant={'outline'} onClick={()=>setIsShowAll(!isShowAll)}>
                            {isShowAll ? 'Hide' : 'Show'}
                        </Button>
                    </GroupFlex>
                    {isShowAll &&
                        <Block top={30}>
                            {transactions?.map(day => (
                                day?.transactions.map(tx => (
                                    <TransactionCard key={tx.id} transaction={tx} />
                                ))
                            ))}
                        </Block>
                    }
                </Block>
            </CardBody>
        </Card>
    </div>)
}