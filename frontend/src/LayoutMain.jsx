import React from 'react';
import Navbar from '/src/components/Home/Navbar';
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LayoutMain;