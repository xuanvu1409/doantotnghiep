import React, { useState} from 'react';
import InputFeild from "../../../../../components/Share/inputFeild";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import DateOfBirth from "../../../../../components/Share/dateOfBirth";
import Gender from "../../../../../components/Share/gender";
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";
import useToggle from "../../../../../hooks/useToggle";
import moment from "moment";
import {updateBasicInfo} from "../../../../../api/memberApi";
import {toast} from "react-toastify";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {titleCase} from "../../../../../utils/helper";

const BasicInfoForm = () => {
    const form = useForm();
    const dispatch = useDispatch();
    const {handleSubmit} = form;
    const {currentMember} = useSelector(state => state.member);
    const [loading, setLoading] = useState();
    const [isFormVisible, setIsFormVisible] = useToggle();

    const onSubmit = (data) => {
        let formData = {
            name: data.name,
            dateOfBirth: moment(`${data.year.value}-${data.month.value}-${data.day.value}`).format(),
            genderId: data.genderId
        }
        setLoading(true)
        updateBasicInfo(formData).then(res => {
            toast.success(res.data.message);
            dispatch(getMember(res.data._id));
            setIsFormVisible();
            setLoading(false);
        }).catch(e => {
            console.log(e)
            // toast.error(e.response.data.message);
        })
    }

    return (
        <>
            <div className="card-header">
                <h2 className="card-title h4">Thông tin cơ bản</h2>

                <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" onClick={setIsFormVisible}>
                    <i className="tio-edit"/>
                </button>
            </div>
            {/* Body */}
            <div className="card-body">
                {/* Form */}
                {
                    isFormVisible
                    ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputFeild name={"name"} form={form} error={{
                                required: {
                                    value: true,
                                    message: "Vui lòng điền tên của bạn"
                                },
                                minLength: {value: 2, message: "Vui lòng điền mật khẩu trên 2 ký tự"},
                                maxLength: {value: 50, message: "Vui lòng không điền quá 50 ký tự"}
                            }} label={"Tên"} placeholder={"Nhập tên của bạn"} value={currentMember.name} />

                            <div className="row">
                                <label className="col-sm-3 col-form-label input-label">Ngày sinh</label>
                                <div className="col-sm-9">
                                    <DateOfBirth form={form} value={currentMember.dateOfBirth}/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-sm-3 col-form-label input-label">Giới tính</label>
                                <div className="col-sm-9">
                                    <Gender form={form} inputClass={"form-control"} value={currentMember.genderId} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <ButtonSubmit loading={loading} className={'mr-2'}/>
                                <button type="button" className="btn btn-white" onClick={setIsFormVisible}>Đóng</button>
                            </div>
                        </form>
                        :
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3 cursor-pointer" onClick={setIsFormVisible}>
                            <li className={'row'}>
                                <div className="col-sm-3">Tên</div>
                                <div className="col-sm-9">{titleCase(currentMember.name)}</div>
                            </li>
                            <li className={'row'}>
                                <div className="col-sm-3">Ngày sinh</div>
                                <div className="col-sm-9">{moment(currentMember.dateOfBirth).format('D/MM/Y')}</div>
                            </li>
                            <li className={'row'}>
                                <div className="col-sm-3">Giới tính</div>
                                <div className="col-sm-9">{currentMember.genderId.name}</div>
                            </li>
                        </ul>
                }
                {/* End Form */}
            </div>
            {/* End Body */}
        </>
    );
};

export default BasicInfoForm;