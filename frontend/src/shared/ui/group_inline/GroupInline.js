import React from "react";

export default function GroupInline({children, width, height, overflow, isAlignStart=false}) {

    const style = {
        width,
        height,
        display: 'flex',
        alignItems: isAlignStart ? 'start' : 'center',
        overflow,
    }

    return (
        <div style={style}>
            {children}
        </div>
    )
}