import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {confirmMatched, getMatchedRequest, removeMatched} from "../../../../../api/actionApi";
import {toast} from "react-toastify";
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";
import {Dropdown, OverlayTrigger, Popover} from "react-bootstrap";
import CustomPagination from "../../../../../components/Share/customPagination";
import {useSelector} from "react-redux";

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

// const PopoverComponent = (props) => (
//     <Popover id="popover-basic">
//         <Popover.Title as="h4">Lời tỏ tình</Popover.Title>
//         <Popover.Content>
//             {props.content}
//         </Popover.Content>
//     </Popover>
// );

const popover = (props) => {
    let message = ""
    //Sometimes, props.popper.state is undefined.
    //It runs this function enough times that state gets a value
    if (props.popper.state) {
        message = props.popper.state.options.testObj
    }

    return (
        <Popover id="popover-basic"  {...props}>
            <Popover.Title as="h4">Lời tỏ tình</Popover.Title>
            <Popover.Content>
                {message}
            </Popover.Content>
        </Popover>
    );
}

const MatchedRequest = (props) => {
    const {currentMember} = useSelector(state => state.member);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const [matchedRequest, setMatchedRequest] = useState([]);

    useEffect(() => {
        loadData(pagination.page, pagination.limit);
    }, [])

    const loadData = async (page, limit) => {
        await getMatchedRequest({page, limit}).then(res => {
            setMatchedRequest(res.data.matchedRequest);
            setPagination({...pagination, totalRows: res.data.totalRows});
        })
    }

    const handlePageChange = (newPage) => {
        setPagination({...pagination, page: newPage});
    }

    const deletematchedRequest = async (id) => {
        await removeMatched(id).then(res => {
            toast.success(res.data.message);
            loadData(pagination.page, pagination.limit);
        })
    }

    const matched = async (id) => {
        await confirmMatched(id).then(res => {
            toast.success(res.data.message);
            loadData(pagination.page, pagination.limit);
            props.reload();
        })
    }

    return (
        <div className={'search-page'}>
            <div className="row">
                {
                    matchedRequest.map(e => (
                        <div className="col-lg-3 mb-3 bg-card" key={e._id}>
                            <Link to={'/profile/' + e.relatedId.profileId}>
                                <OverlayTrigger trigger={['hover', 'focus']} placement="auto"
                                                overlay={popover} popperConfig={{testObj:e.content}}>
                                    <div className="card">
                                        <img className="card-img-top card-img img-profile"
                                             src={e.relatedId?.avatar.srcImage}
                                             alt={e.name}/>
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
                                                    <Dropdown.Item onClick={() => matched(e._id)}>Đồng ý</Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() => deletematchedRequest(e._id)}>Xóa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </OverlayTrigger>
                            </Link>
                        </div>
                    ))
                }
                {
                    matchedRequest.length === 0
                    &&
                    <div className="col-lg-12 mt-2 text-center">
                        Bạn chưa có lời mời kết đôi, thêm thông tin để tăng tương tác <Link
                        to={'/profile/' + currentMember.profileId}>tại đây</Link>.
                    </div>
                }
                {
                    matchedRequest.length !== 0
                    &&
                    <div className="col-lg-12 mt-2">
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default MatchedRequest;