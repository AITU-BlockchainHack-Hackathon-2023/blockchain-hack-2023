import React, {useContext, useState} from "react";
import Box from "../shared/ui/box/Box";

const AppContainer = ({isContainer=false, isNavbar=false, isHorizontalCenter=false, children, isBoxCentered, isScrollable=false}) => {


    return (<>
        <Box>
            {children}
        </Box>
    </>)
}
export default AppContainer