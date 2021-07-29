import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";
import CustomPagination from "../../../../../components/Share/customPagination";
import {getFavoritedYou} from "../../../../../api/actionApi";
import {useSelector} from "react-redux";


const FavoritedYou = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const [data, setData] = useState([]);
    const {currentMember} = useSelector(state => state.member);

    useEffect(() => {
        loadData(pagination.page, pagination.limit);
    }, [pagination.page])

    const loadData = async (page, limit) => {
        await getFavoritedYou({page, limit}).then(res => {
            setData(res.data.favoritedYou)
            setPagination({...pagination, totalRows: res.data.totalRows});
        })
    }

    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage});
    }

    return (
        <div className={'search-page'}>
            <div className="row">
                {
                    data.map(e => (
                        <div className="col-lg-3 mb-3" key={e._id}>
                            <Link to={'/profile/' + e.actionBy.profileId}>
                                <div className="card">
                                    <img className="card-img-top card-img img-profile" src={e.actionBy?.avatar.srcImage}
                                         alt={e.name}/>
                                    <div className="card-img-custom">
                                        <h5 className="card-title p-3">
                                            <div className="card-title">
                                                {titleCase(e.actionBy.name)}, {moment().diff(e.actionBy.dateOfBirth, 'years', false)} {e.actionBy.isConfirm &&
                                            <i className="tio-checkmark-circle"/>}
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                {
                    data.length === 0
                    &&
                    <div className="col-lg-12 mt-2 text-center">
                        Bạn chưa được ai yêu thích, thêm thông tin để tăng tương tác <Link to={'/profile' + currentMember.profileId}>tại đây</Link>.
                    </div>
                }
                {
                    data.length !== 0
                    &&
                    <div className="col-lg-12 mt-2">
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default FavoritedYou;