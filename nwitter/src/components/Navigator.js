import React from "react";
import { Link } from "react-router-dom";

const Navigator = ({ userName }) => (
    <ul>}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">{userName}'s Profile</Link></li>
    </ul>
)

export default Navigator;