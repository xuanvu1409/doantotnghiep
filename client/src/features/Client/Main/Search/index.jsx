import React, {useEffect, useState} from 'react';
import "./search.css";
import CustomPagination from "../../../../components/Share/customPagination";
import {search} from "../../../../api/memberApi";
import {Link} from "react-router-dom";
import moment from "moment";
import {titleCase} from "../../../../utils/helper";
import {useSelector} from "react-redux";
import {Dropdown, Modal} from "react-bootstrap";
import {favoriteMember, getAction, likeMember, sendCrush} from "../../../../api/actionApi";
import {sweetAlert} from "../../../../libs/sweetAlert2";
import Textarea from "../../../../components/Share/textarea";
import ButtonSubmit from "../../../../components/Share/buttonSubmit";
import {useForm} from "react-hook-form";
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

const Index = () => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        totalRows: 0
    })
    const [dropMenu, setDropMenu] = useState({
        like: false,
        favorite: false,
        relationship: {},
        relationshiped: false
    })
    const filterState = useSelector(state => state.filter);
    const [member, setMember] = useState([]);
    const [loadingDropMenu, setLoadingDropMenu] = useState(false);
    const {currentMember} = useSelector(state => state.member);
    const [loading, setLoading] = useState(false);
    const [memberId, setMemberId] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const form = useForm();
    const {handleSubmit} = form;


    useEffect(async () => {
        await getData(pagination.page, pagination.limit);
    }, [filterState, pagination.page])

    const getData = async (page, limit) => {
        await search({page, limit}).then(res => {
            setMember(res.data.members);
            setPagination({...pagination, totalRows: res.data.totalRows});
        })
    }

    const handlePageChange = async (newPage) => {
        setPagination({...pagination, page: newPage})
    }

    const toggleDropdown = (event, memberId) => {
        setMemberId(memberId)
        if (event === true) {
            setLoadingDropMenu(true);
            getAction({memberId}).then(res => {
                console.log(res.data)
                setLoadingDropMenu(false);
                setDropMenu({
                    like: res.data.like,
                    favorite: res.data.favorite,
                    relationship: res.data.relationship,
                    relationshiped: res.data.relationshiped
                })
            })
        }
    }

    const like = async (memberId) => {
        let formData = {
            memberId: memberId
        }
        await likeMember(formData).then(res => {
            toast.success(res.data.message)
        })
    }

    const favorite = async (memberId) => {
        let formData = {
            memberId: memberId
        }
        await favoriteMember(formData).then(res => {
            sweetAlert.success("Thành công", res.data.message, () => {
            })
        })
    }

    const onSubmit = async (value) => {
        let formData = {
            memberId: memberId,
            content: value.content
        }
        setLoading(true);
        await sendCrush(formData).then(res => {
            setLoading(false);
            setModalShow(false);
            sweetAlert.success("Thành công", res.data.message, () => {
            })
        })
    }

    const cancelSendCrush = (memberId) => {
        let formData = {
            memberId: memberId
        }
        sweetAlert.warning(
            dropMenu.relationshiped ? "Người này đã tỏ tình với bạn" : "Huỷ kết đôi",
            dropMenu.relationshiped ? "Bạn chắc chắn từ chối lời tỏ tình?" : "Bạn muốn tiếp tục hủy kết đôi?",
            async () => {
                await sendCrush(formData).then(res => {
                    sweetAlert.success("Thành công", res.data.message, () => {
                    })
                })
            })
    }

    return (
        <div className="content container-fluid search-page">
            <div className="row">
                {
                    member.map(e => (
                        <div className="col-lg-3 col-sm-4 col-md-4 col-6 mb-3 bg-card" key={e._id}>
                            <Link to={'/profile/' + e.profileId}>
                                <div className="card">
                                    <img className="card-img-top card-img img-profile" src={e.avatar.srcImage}
                                         alt={e.name}/>
                                    <div className="card-img-custom">
                                        <h5 className="card-title p-3">
                                            <div className="card-title">
                                                {titleCase(e.name)}, {moment().diff(e.dateOfBirth, 'years', false)} {e.isConfirm &&
                                            <i className="tio-checkmark-circle"/>}
                                            </div>
                                        </h5>
                                    </div>
                                    <div className="card-pinned drop-btn">
                                        <Dropdown onToggle={event => toggleDropdown(event, e._id)}>
                                            <Dropdown.Toggle as={dropDown} id={e._id}>
                                                <i className="tio-more-vertical"/>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu align={'right'}>
                                                {
                                                    loadingDropMenu
                                                        ?
                                                        <div onClick={e => e.preventDefault()}
                                                             className={'text-center'}>Loading<span
                                                            className='typing-dots'><span>.</span><span>.</span><span>.</span></span>
                                                        </div>
                                                        :
                                                        <>
                                                            <Dropdown.Item
                                                                onClick={() => like(e._id)}>{dropMenu.like ? 'Bỏ thích' : 'Thích'}</Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={() => favorite(e._id)}>{dropMenu.favorite ? 'Bỏ mục yêu thích' : 'Thêm mục yêu thích'}</Dropdown.Item>
                                                            {
                                                                dropMenu.relationshiped
                                                                    ?
                                                                    <Dropdown.Item
                                                                        onClick={() => cancelSendCrush(e._id)}>Từ
                                                                        chối</Dropdown.Item>
                                                                    :
                                                                    <Dropdown.Item
                                                                        onClick={() => dropMenu.relationship ? cancelSendCrush(e._id) : setModalShow(true)}
                                                                    >{dropMenu.relationship ? 'Hủy tỏ tình' : 'Tỏ tình'}</Dropdown.Item>

                                                            }
                                                        </>
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                {
                    member.length === 0
                    &&
                    <div className="col-lg-12 mt-2 text-center">
                        Không có ai xung quanh phù hợp mới tìm kiếm của bạn.
                    </div>
                }
                {
                    member.length !== 0
                    &&
                    <div className="col-lg-12 mt-2">
                        <CustomPagination pagination={pagination} onPageChange={handlePageChange}/>
                    </div>
                }
            </div>
            <Modal show={modalShow} onHide={() => setModalShow(false)} size={'md'} centered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Gửi lời tỏ tình cho người bạn thích
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Textarea rows={5} name={"content"}
                                  form={form}
                                  defaultValue={`Xin chào, tôi là ${currentMember.name}!`}
                                  validation={{
                                      required: {
                                          value: true,
                                          message: "Vui lòng điền vào trường này"
                                      },
                                      maxlength: {
                                          value: 500,
                                          message: "Vui lòng không nhập quá 500 ký tự"
                                      }
                                  }}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonSubmit className={'mr-2'} loading={loading} buttonText={"Gửi lời tỏ tình"}/>
                        <button type={"button"} onClick={() => setModalShow(false)} className={"btn btn-white"}>Đóng
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default Index;
