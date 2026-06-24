import React, { children } from 'react';
import Header from './Header';  
import Slider from './Slider';
import { Outlet } from 'react-router-dom';

const Layout = ({ Children }) => {
    return (
        <>
            <Slider />
            <Header />
            <main>{children}</main>
            <Outlet />
        </>
    )
}

export default Layout;