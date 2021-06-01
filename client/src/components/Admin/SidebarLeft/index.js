import React from 'react';
import {Link} from "react-router-dom";

const Index = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/admin/setting">setting</Link>
                </li>
                <li>
                    <Link to="/admin/member">member</Link>
                </li>
            </ul>
        </div>
    );
};

export default Index;
