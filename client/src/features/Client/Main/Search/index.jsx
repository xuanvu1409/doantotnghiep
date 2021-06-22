import React, {useEffect, useState} from 'react';
import "./search.css";
import CustomPagination from "../../../../components/Share/customPagination";
import {search} from "../../../../api/memberApi";
import {Link} from "react-router-dom";
import moment from "moment";
import {titleCase} from "../../../../utils/helper";
import {useDispatch, useSelector} from "react-redux";

const Index = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const filterState = useSelector(state => state.filter);
    const [member, setMember] = useState([]);


    useEffect(async () => {
        await getData(pagination.page, pagination.limit);
    }, [filterState])

    const getData = async (page, limit) => {
        await search({page, limit}).then(res => {
            setMember(res.data);
            setPagination({...pagination, totalRows: res.data.length});
        })
    }

    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage});
    }

    return (
        <div className="search-page">
            <div className="row">
                {
                    member.map(e => (
                        <div className="col-lg-3 mb-3" key={e._id}>
                            <Link to={'/profile/' + e.profileId}>
                                <div className="card" >
                                    <img className="card-img-top card-img img-profile" src={e.avatar.srcImage}
                                         alt={e.name} />
                                    <div className="card-img-custom">
                                        <h5 className="card-title p-3"><div className="card-title">
                                            {titleCase(e.name)}, {moment().diff(e.dateOfBirth, 'years',false)} {e.isConfirm && <i className="tio-checkmark-circle"/>}</div></h5>
                                    </div>
                                    <div className="card-pinned">
                                        <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                                           href="javascript:;">
                                            <i className="tio-more-vertical"/>
                                        </a>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                {
                    member.length !== 0
                    &&
                    <div className="col-lg-12 mt-2">
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Index;
