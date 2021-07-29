import React, {useEffect, useState} from 'react';
import {getFavoritedYou, getYourFavories, removeFavorite} from "../../../../../api/actionApi";
import {sweetAlert} from "../../../../../libs/sweetAlert2";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";
import {Dropdown} from "react-bootstrap";
import CustomPagination from "../../../../../components/Share/customPagination";


const dropDown = React.forwardRef(({children, onClick}, ref) => (
    <span className="btn btn-icon btn-sm bg-white btn-ghost-secondary rounded-circle"
          ref={ref}
          onClick={(e) => {
              e.preventDefault();
              onClick(e);
          }}
    >
        {children}
    </span>
));

const YourFavorites = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData(pagination.page, pagination.limit);
    }, [pagination.page])

    const loadData = async (page, limit) => {
        await getYourFavories({page, limit}).then(res => {
            setData(res.data.yourFavorites)
            setPagination({...pagination, totalRows: res.data.totalRows});
        })
    }

    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage});
    }

    const deleteFavoritedYou = async (id) => {
        sweetAlert.warning("Xoá khỏi mục yêu thích", "Bạn chắc chắn muốn xóa khỏi mục yêu thích", async () => {
            await removeFavorite(id).then(res => {
                toast.success(res.data.message);
                loadData(pagination.page, pagination.limit);
            })
        })
    }

    return (
        <div className={'search-page'}>
            <div className="row">
                {
                    data.map(e => (
                        <div className="col-lg-3 mb-3 bg-card" key={e._id}>
                            <Link to={'/profile/' + e.actionMember.profileId}>
                                <div className="card">
                                    <img className="card-img-top card-img img-profile" src={e.actionMember?.avatar.srcImage}
                                         alt={e.name}/>
                                    <div className="card-img-custom">
                                        <h5 className="card-title p-3">
                                            <div className="card-title">
                                                {titleCase(e.actionMember.name)}, {moment().diff(e.actionMember.dateOfBirth, 'years', false)} {e.actionMember.isConfirm &&
                                            <i className="tio-checkmark-circle"/>}
                                            </div>
                                        </h5>
                                    </div>
                                    <div className="card-pinned drop-btn">
                                        <Dropdown>
                                            <Dropdown.Toggle as={dropDown} id={e._id}>
                                                <i className="tio-more-vertical"/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu align={'right'}>
                                                <Dropdown.Item onClick={() => deleteFavoritedYou(e._id)}>Xóa mục yêu thích</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                        Bạn chưa yêu thích ai, hãy tìm kiếm xung quanh <Link to={'/search'}>tại đây</Link>.
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

export default YourFavorites;