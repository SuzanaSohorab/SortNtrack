import React from 'react';
import NavBar from '../Compontents/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Compontents/Footer';

const MainLayouts = () => {
    return (
        <div className='bg-linear-to-br from-green-100 via-lime-100 to-emerald-100'>
            <NavBar>

            </NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;