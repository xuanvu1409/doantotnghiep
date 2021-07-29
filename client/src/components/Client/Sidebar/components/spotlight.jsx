import React, {useEffect, useState} from 'react';
import {getSpotlight} from "../../../../api/memberApi";
import {Link} from "react-router-dom";

const Spotlight = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getSpotlight().then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <li className="top-trend">
            <div className="trend">
                <span className="divider text-uppercase font-weight-bolder">nổi bật</span>
            </div>
            <div className="list-trend">
                {
                    data.map(e => (
                        <Link to={'/profile/'+e.profileId} className="user-box" key={e._id}>
                                                <span className="avatar" data-toggle="tooltip" data-placement="top"
                                                      title="Xuân vũ">
                                                  <img className="avatar-img" src={e.avatar.srcImage}
                                                       alt="Image Description"/>
                                                </span>
                        </Link>
                    ))
                }
            </div>
        </li>
    );
};

export default Spotlight;