import React from "react";
import Typography from "../shared/ui/typography/Typography";
import Block from "../shared/ui/block/Block";

export default function NotFoundPage() {
    return(
        <Block isAlignCenter={true} isCenteredByY={true}>
            <Typography size={28} weight={700}>404 Page Not Found</Typography>
        </Block>
    )
}