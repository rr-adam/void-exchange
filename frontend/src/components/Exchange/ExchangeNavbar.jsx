import React from 'react'
import Account from './Account';
import { NavLink } from "react-router-dom";
import { logo_experimental } from '../../assets'

import { useEthers } from '@usedapp/core'

const ExchangeNavbar = () => {
  const { account } = useEthers();

  const navlinkStyling = ({ isActive }) => {
    return isActive
      ? "text-primary bg-transparent"
      : "active:bg-transparent active:text-black "
  }

  return (
    <div className="navbar backdrop-blur md:px-12 md:py-2 fixed top-0 z-50 lg:border-b border-slate-900/10 bg-white/80">
      <div className="navbar-start">
        {account &&
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink
                  to="/app/swap"
                  className={navlinkStyling}
                >
                  Swap
                </NavLink></li>
              <li>
                <NavLink
                  to="/app/pool"
                  className={navlinkStyling}
                >
                  Pool
                </NavLink>
              </li>
            </ul>
          </div>
        }
        <NavLink
          to="/"
          className="btn btn-ghost normal-case text-xl text-primary"
        >
          <div className="font-title text-primary inline-flex transition-all duration-200 md:text-2xl">
            <img src={`${logo_experimental}`} className="h-8 mr-2" />
            <span className="text-primary">Void</span>
            <span className="text-base-content">Exchange</span>
          </div>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        {account &&
          <ul className="menu menu-horizontal px-1">
            <li className='mx-1'>
              <NavLink
                to="/app/swap"
                className={navlinkStyling}
              >
                Swap
              </NavLink>
            </li>
            <li className='mx-1'>
              <NavLink
                to="/app/pool"
                className={navlinkStyling}
              >
                Pool
              </NavLink>
            </li>
          </ul>
        }
      </div>
      <div className="navbar-end">
        {account && <Account />}
      </div>
    </div>
  )
}

export default ExchangeNavbar;