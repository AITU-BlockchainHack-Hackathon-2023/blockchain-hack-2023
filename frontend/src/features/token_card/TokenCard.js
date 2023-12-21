import React from "react";
import styles from './tokenCard.module.css'
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
export default function TokenCard({token={}}) {


    return (<div className={styles.TokenCard}>
        <GroupFlex align={'aic'} >
            <GroupFlex align={'aic'} justify={'start'}>
                <img width={25} height={25} style={{marginRight: 15}} src={token?.logo_url} alt="token_logo"/>
                <p>{token?.name}</p>
            </GroupFlex>
            <Block isRightCenter={true}>
                <Typography size={16} color={'black'} weight={500}>{token?.balance}</Typography>
                <Typography size={16} color={'grey'} weight={500}>${token?.balance_usd}</Typography>
            </Block>
        </GroupFlex>
    </div>)
}