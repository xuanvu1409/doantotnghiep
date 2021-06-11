import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getContactNotHidden} from "../../../../../api/memberApi";

const listContact = [
    {id: 1, label: "Số điện thoại", value: "Số điện thoại", icon: "tio-iphone"},
    {id: 2, label: "Facebook", value: "Facebook", icon: "tio-facebook"},
    {id: 3, label: "Instagram", value: "Instagram", icon: "tio-instagram"},
    {id: 4, label: "Github", value: "Github", icon: "tio-github"},
    {id: 5, label: "YouTube", value: "YouTube", icon: "tio-youtube"},
    {id: 6, label: "Website", value: "Website", icon: "tio-globe"},
]

const Contact = () => {
    const [contact, setContact] = useState([]);

    useEffect(async () => {
        const getContact = async () => {
            await getContactNotHidden().then(res => {
                setContact(res.data);
            }).catch(e => {
                console.log(e)
            })
        }
        await getContact();
    }, [])

    return (
        <div className="card mb-3 mb-lg-5">
            {/* Header */}
            <div className="card-header">
                <h2 className="card-header-title h5">Thông tin liên hệ</h2>
                <Link to={'/settings'} className="btn btn-sm btn-white"><i className="tio-edit"/></Link>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="card-body">
                <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                    {
                        contact.length > 0
                        ?
                        contact.map((e) => (
                            <li key={e._id}>
                                {
                                    listContact.map((x, index) => (
                                        x.label === e.name
                                            ?
                                            <span key={x.id}>
                                                <i className={x.icon + " nav-icon mr-2"}/><a href={x.id === 1 ? "tel:" + e.value : e.value}>{e.name}</a>
                                            </span>
                                            :
                                            <div key={x.id}/>
                                    ))
                                }
                            </li>
                        ))
                            :
                            <li>Chưa có thông tin liên hệ</li>
                    }
                </ul>
            </div>
            {/* End Body */}
        </div>
    );
};

export default Contact;