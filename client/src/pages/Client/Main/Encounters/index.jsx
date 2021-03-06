import React, {useEffect, useState} from 'react';
import './encounters.css';
import Action from "./components/action";
import {encounter} from "../../../../api/memberApi";
import Image from "./components/image";
import Info from "./components/info";
import {favoriteMember, likeMember, sendCrush} from "../../../../api/actionApi";
import {useSelector} from "react-redux";
import LoadingSmall from "../../../../components/Share/loadingSmall";
import {sweetAlert} from "../../../../libs/sweetAlert2";
import {Modal} from "react-bootstrap";
import ButtonSubmit from "../../../../components/Share/buttonSubmit";
import Textarea from "../../../../components/Share/textarea";
import {useForm} from "react-hook-form";

const Index = () => {
    const [data, setData] = useState({
        member: {},
        images: [],
        liked: false,
        favorited: false,
        relationship: false,
        relationshiped: false,
    })
    const [oldData, setOldData] = useState({});
    const filter = useSelector(state => state.filter);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const {currentMember} = useSelector(state => state.member);
    const form = useForm();
    const {handleSubmit} = form;

    useEffect(() => {
        getData();
    }, [filter])

    const like = async () => {
        setOldData(data);
        let formData = {
            memberId: data.member._id
        }
        await likeMember(formData).then(res => {
            getData();
        })
    }

    const skip = async () => {
        setOldData(data);
        await getData(data.member._id);
    }

    const favorite = async () => {
        setOldData(data);
        let formData = {
            memberId: data.member._id
        }
        await favoriteMember(formData).then(res => {
            sweetAlert.success("Thành công", res.data.message, () => {
                getData();
            })
        })
    }

    const getData = async () => {
        setLoading(true);
        await encounter({memberId:data.member._id}).then(res => {
            setData({
                member: res.data.member,
                images: res.data.images,
                liked: res.data.liked,
                favorited: res.data.favorited,
                relationship: res.data.relationship,
                relationshiped: res.data.relationshiped
            });
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }

    const onSubmit = async (value) => {
        let formData = {
            memberId: data.member._id,
            content: value.content
        }
        await sendCrush(formData).then(res => {
            setModalShow(false);
            sweetAlert.success("Thành công", res.data.message, () => {
                getData();
            })
        })
    }

    const cancelSendCrush = () => {
        let formData = {
            memberId: data.member._id
        }
        sweetAlert.warning(
            data.relationshiped ? "Người này đã tỏ tình với bạn" : "Huỷ tỏ tình",
            data.relationshiped ? "Bạn chắc chắn từ chối lời tỏ tình?" : "Bạn muốn tiếp tục hủy tỏ tình?",
            async () => {
            await sendCrush(formData).then(res => {
                sweetAlert.success("Thành công", res.data.message, () => {
                    getData();
                })
            })
        })
    }

    return (
        <div className={'content container-fluid'}>
            <div className="encouter-page">
                <div className="card photo">
                    {
                        loading
                            ?
                            <LoadingSmall loading={loading} style={{borderRadius: '.75rem'}}/>
                            :
                            <div className="row">
                                <Image images={data.images} avatar={data.member?.avatar}/>
                                <Info member={data.member}/>
                            </div>
                    }
                </div>

                <Action
                    oldData={oldData}
                    back={() => setData(oldData)}
                    like={() => like}
                    skip={() => skip}
                    liked={data.liked}
                    favorite={() => favorite}
                    loading={loading}
                    favorited={data.favorited}
                    sendCrush={() => setModalShow(true)}
                    relationship={data.relationship}
                    cancelRelationship={() => cancelSendCrush}
                />
            </div>
            <Modal show={modalShow} onHide={() => setModalShow(false)} size={'md'} centered>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Gửi lời tỏ tình cho người bạn thích
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Textarea rows={5} form={form} name={"content"}
                                  defaultValue={data.member ? `Xin chào, tôi là ${currentMember.name}!` : "Xin chào, làm quen nha!"}
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
