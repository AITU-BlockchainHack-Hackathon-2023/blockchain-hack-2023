import React, {useState} from "react";

import Card from "../../shared/ui/card/Card";
import CardBody from "../../shared/ui/card/CardBody";
import Typography from "../../shared/ui/typography/Typography";
import Block from "../../shared/ui/block/Block";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";
import Button from "../../shared/ui/button/Button";
import Badge from "../../shared/ui/badge/Badge";
import TokenCard from "../../features/token_card/TokenCard";

import styles from './portfolio.module.css'
export default function Portfolio({addressInfo={}}) {

    const [isShowAll, setIsShowAll] = useState(true)

    return (<div className={styles.Portfolio}>
        <Card minWidth={400} maxWidth={500}>
            <CardBody>
                <Block bottom={12}>
                    <Badge text={addressInfo?.type}/>
                    <Typography bottom={10} size={16} weight={800} color={'black'}></Typography>
                    <Typography bottom={4} size={16} weight={700} color={'black'}>{addressInfo.address}</Typography>
                    <Typography bottom={2} size={16} weight={600} color={'grey'}>Last activity {addressInfo?.updated_at}</Typography>
                    <Typography size={16} weight={600} color={'grey'}>Wallet age {addressInfo?.wallet_age} days</Typography>
                </Block>
                <GroupFlex width={'100%'} align={'aic'} justify={'jcsb'}>
                    <Block>
                        <Typography size={21} weight={800} color={'black'}>Portfolio</Typography>
                        <Typography size={16} weight={700} color={'grey'}>Balance: ${addressInfo?.net_worth_usd}</Typography>
                    </Block>
                    <Button size={'small'} width={'fit-content'} variant={'outline'} onClick={()=>setIsShowAll(!isShowAll)}>
                        {isShowAll ? 'Hide' : 'Show'}
                    </Button>
                </GroupFlex>
                {isShowAll &&
                    <Block top={15}>
                        {addressInfo?.tokens?.map(token => {
                            if (token.balance !== 0)
                                return <TokenCard token={token}/>
                        })}
                    </Block>
                }
            </CardBody>
        </Card>
    </div>)
}