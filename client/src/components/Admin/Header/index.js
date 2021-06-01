import React from 'react';
import {Link} from "react-router-dom";

const Index = () => {
    return (

        <ul>
            <li>
                <Link to="/admin/dashboard">dashboard</Link>
            </li>
            <li>
                <Link to="/admin/auth/login">login</Link>
            </li>
        </ul>
    );
};

export default Index;
