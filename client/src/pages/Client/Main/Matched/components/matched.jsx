import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";
import {Dropdown, Modal} from "react-bootstrap";
import CustomPagination from "../../../../../components/Share/customPagination";
import {getMatched, removeMatched} from "../../../../../api/actionApi";
import {sweetAlert} from "../../../../../libs/sweetAlert2";
import {toast} from "react-toastify";

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

const Matched = (props) => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const [data, setData] = useState({matched: [], sender: null});
    const history = useHistory();

    useEffect(() => {
        loadData(pagination.page, pagination.limit);
    }, [pagination.page, props.reload])

    const loadData = async (page, limit) => {
        await getMatched({page, limit}).then(res => {
            setData({matched: res.data.matched, sender: res.data.sender});
            setPagination({...pagination, totalRows: res.data.totalRows});
        })
    }

    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage});
    }

    const deleteMatched = async (id) => {
        sweetAlert.warning("Huỷ kết đôi", "Bạn chắc chắn muốn hủy kết đôi", async () => {
            await removeMatched(id).then(res => {
                toast.success(res.data.message);
                loadData(pagination.page, pagination.limit);
            })
        })
    }

    return (
        <div className={'search-page'}>
            <div className="row">
                {
                    data.matched.map(e => (
                        e.relatedId._id === data.sender
                        ?
                        <div className="col-lg-3 mb-3 bg-card" key={e._id}>
                            <Link to={'/profile/' + e.relatingId.profileId}>
                                <div className="card">
                                    <img className="card-img-top card-img img-profile" src={e.relatingId?.avatar.srcImage}
                                         alt={e.relatingId.name}/>
                                    <div className="card-img-custom">
                                        <h5 className="card-title p-3">
                                            <div className="card-title">
                                                {titleCase(e.relatingId.name)}, {moment().diff(e.relatingId.dateOfBirth, 'years', false)} {e.relatingId.isConfirm &&
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
                                                <Dropdown.Item onClick={() => deleteMatched(e._id)}>Xóa kết đôi</Dropdown.Item>
                                                <Dropdown.Item onClick={() => history.push('/messages/' + e.relatingId._id)}>Nhắn tin</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Link>
                        </div>
                            :
                            <div className="col-lg-3 mb-3 bg-card" key={e._id}>
                                <Link to={'/profile/' + e.relatedId.profileId}>
                                    <div className="card">
                                        <img className="card-img-top card-img img-profile" src={e.relatedId?.avatar.srcImage}
                                             alt={e.relatedId.name}/>
                                        <div className="card-img-custom">
                                            <h5 className="card-title p-3">
                                                <div className="card-title">
                                                    {titleCase(e.relatedId.name)}, {moment().diff(e.relatedId.dateOfBirth, 'years', false)} {e.relatedId.isConfirm &&
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
                                                    <Dropdown.Item onClick={() => deleteMatched(e._id)}>Xóa kết đôi</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => history.push('/messages/'+ e.relatedId._id)}>Nhắn tin</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    ))
                }
                {
                    data.matched.length === 0
                    &&
                    <div className="col-lg-12 mt-2 text-center">
                        Bạn chưa kết đôi với ai, hãy tìm kiếm xung quanh <Link to={'/search'}>tại đây</Link>.
                    </div>
                }
                {
                    data.matched.length !== 0
                    &&
                    <div className="col-lg-12 mt-2">
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Matched;