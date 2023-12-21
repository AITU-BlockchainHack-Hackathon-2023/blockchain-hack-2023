import React, {useContext, useState} from "react";
import Box from "../shared/ui/box/Box";
import AppBar from "../shared/ui/app_bar/AppBar";
import Nav from "../shared/ui/nav/Nav";
import GroupFlex from "../shared/ui/group_flex/GroupFlex";
import Logo from "../shared/ui/logo/Logo";
import Block from "../shared/ui/block/Block";
import AddressSearch from "../features/address_serach/AddressSearch";
import NavLink from "../shared/ui/nav/NavLink";
import useToggle from "../shared/libs/hooks/useToggle";
import AboutProject from "../features/about_project/AboutProject";

const AppContainer = ({isContainer=false, isNavbar=false, isHorizontalCenter=false, children, isBoxCentered, isScrollable=false}) => {


    return (<>
        <Box>
            {children}
        </Box>
    </>)
}
export default AppContainer