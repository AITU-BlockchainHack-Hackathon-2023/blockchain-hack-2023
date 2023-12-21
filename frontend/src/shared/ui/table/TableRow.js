import React from "react";

export default function  TableRow({isHead, children, onClick=f=>f}) {

    if (isHead) {
        return (<>
            <th>{children}</th>
        </>)
    }

    return (<>
        <tr onClick={onClick}>{children}</tr>
    </>)
}