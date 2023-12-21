import React from "react";
import Card from "../../shared/ui/card/Card";
import CardBody from "../../shared/ui/card/CardBody";
import CardHeader from "../../shared/ui/card/CardHeader";
import GroupInline from "../../shared/ui/group_inline/GroupInline";
import GroupFlex from "../../shared/ui/group_flex/GroupFlex";

export default function AddressInfo({ addressInfo={} }) {



    return(<>
        <Card maxWidth={360}>
            <CardHeader>
                Assets
            </CardHeader>
            <CardBody>
                <div style={{overflow:'auto', height:'100%'}}>
                </div>
            </CardBody>
        </Card>
    </>)
}