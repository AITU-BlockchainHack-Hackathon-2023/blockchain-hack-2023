import React from "react";

import Block from "../../shared/ui/block/Block";
import Loader from "../../shared/ui/loader/Loader";
import Overlay from "../../shared/ui/overlay/Overlay";

export default function Loading(){
    return (<>
        <Overlay>
            <Block isAlignCenter={true}>
                <Loader color={'white'}/>
            </Block>
        </Overlay>
    </>);
}