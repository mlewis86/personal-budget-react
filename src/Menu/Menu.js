import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function Menu() {
  return (
    <nav class="menu">
    <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="login">Login</Link></li>
    </ul>
</nav>
  );
}

export default Menu;