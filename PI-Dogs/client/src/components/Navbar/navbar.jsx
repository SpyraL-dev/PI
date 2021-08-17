import React from 'react';
import Logo from "../imgs/Home.jpg"
import './navbar';
import { Link } from 'react-router-dom';



function Nav() {
  return (
    <div class="topnav">
  <a href="/">Landing</a>
  <a href="/home">
  <img id="logo" src={Logo} width="20" height="20" className="" alt="" />
  </a>
  <a href="/about">About</a>
</div>
  );
};

export default Nav;
