import React, {useEffect} from "react";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";

import styles from './transactionCard.module.css'

export default function TransactionCard({transaction = {}}) {

    // useEffect(() => {
    //     console.log('transac', transaction)
    // });

    return (<div className={styles.TransactionCard}>
        <GroupInline>
            <Typography weight={700} size={18} color={'black'}><b>$</b> {transaction?.usd_price}</Typography>
            <Typography weight={700} size={18} color={'black'}>{transaction?.date}</Typography>
        </GroupInline>
        <Block top={2} bottom={2}>
            {transaction?.is_sender
                ? <Typography weight={700} size={15} color={'grey'}>Received from: </Typography>
                : <Typography weight={700} size={15} color={'grey'}>Sended to: </Typography>
            }
            <Typography weight={700} size={15} color={'#2170ff'}>{transaction?.with}</Typography>
        </Block>
        <Typography weight={700} size={15} color={'#2170ff'}><Typography weight={700} size={15} color={'grey'}>hash: </Typography> {transaction?.hash}</Typography>
    </div>)
}