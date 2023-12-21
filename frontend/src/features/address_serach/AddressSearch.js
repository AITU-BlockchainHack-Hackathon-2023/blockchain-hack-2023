import React, {useState} from "react";
import Input from "../../shared/ui/input/Input";
import Button from "../../shared/ui/button/Button";
import GroupInline from "../../shared/ui/group_inline/GroupInline";

export default function AddressSearch({value = '', onChange=f=>f, onSubmit=f=>f}) {

    return (<>
        <GroupInline>
            <Input
                type={'text'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeHolder={'Search for address...'}
                required
            />
            <Button width={'fit-content'} onClick={onSubmit} disabled={value === ''}>Go</Button>
        </GroupInline>
    </>)
}