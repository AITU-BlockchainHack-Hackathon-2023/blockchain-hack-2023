import React from "react";
import styles from './VoteList.module.css'
import Table from "../../shared/ui/table/Table";
import TableHead from "../../shared/ui/table/TableHead";
import TableRow from "../../shared/ui/table/TableRow";
import TableBody from "../../shared/ui/table/TableBody";
import Loader from "../../shared/ui/loader/Loader";
import {formatRelative} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import Block from "../../shared/ui/block/Block";
import Typography from "../../shared/ui/typography/Typography";
export default function VoteList({votes=[]}) {


    return (<div className={styles.VoteList}>
        <Block isAlignCenter={true} padding={'15px 0 10px 0'}>
            <Typography align={'center'} size={16} color={'grey'} weight={600}>Всего голосов: {votes.length}</Typography>
        </Block>
        <Table>
            <TableHead>
                <TableRow isHead={true}>Участник</TableRow>
                <TableRow isHead={true}>Баллы</TableRow>
                <TableRow isHead={true}>Дата</TableRow>
            </TableHead>
            <TableBody Loader={<Loader color={'black'}/>}>
                { votes.map( vote => (<>
                    <TableRow key={vote.id}>
                        <td>{vote.user.name}</td>
                        <td>+{vote.score}</td>
                        <td>{formatRelative(new Date(vote.createdAt), new Date(), {locale: ruLocale})}</td>
                    </TableRow>
                </>))}
            </TableBody>
        </Table>
    </div>)

}