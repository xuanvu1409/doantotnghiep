import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import InputFeild from "../../../../../components/Share/inputFeild";
import {changePass} from "../../../../../api/memberApi";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const ChangePassForm = () => {
    const {currentMember} = useSelector(state => state.member);
    const form = useForm();
    const {handleSubmit, setError} = form;
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        } else {
            setIsFormVisible(true);
        }
    }

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError('confirmPassword', {message: "Mật khẩu không khớp"})
        } else {
            await changePass(currentMember._id, data).then(res => {
                console.log(res)
                toast.success(res.data.message);
            }).catch(e => {
                console.log(e)
            })
        }
    }

    return (
        <>
            <div className="card-header">
                <h4 className="card-title">Đổi mật khẩu</h4>

                <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" onClick={toggleForm}>
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
                            {/* Form Group */}
                            <InputFeild name={"currentPassword"} type={"password"} label={"Mật khẩu hiện tại"}
                                        form={form}
                                        error={{required: {value: true, message: "Vui lòng điền mật khẩu hiện tại"}}}
                                        placeholder={"Nhập mật khẩu hiện tại"}/>
                            <InputFeild name={"newPassword"} type={"password"} label={"Mật khẩu mới"} form={form}
                                        error={
                                            {
                                                required: {value: true, message: "Vui lòng nhập mật khẩu"},
                                                minLength: {
                                                    value: 8,
                                                    message: "Vui lòng điền mật khẩu trên 8 ký tự"
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: "Vui lòng không điền quá 30 ký tự"
                                                }
                                            }
                                        } placeholder={"Nhập mật khẩu mới"}/>

                            <InputFeild name={"confirmPassword"} type={"password"} label={"Nhập lại mật khẩu"}
                                        form={form}
                                        error={{required: {value: true, message: "Vui lòng nhập lại mật khẩu mới"}}}
                                        placeholder={"Nhập lại mật khẩu mới"}/>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary mr-2">Lưu</button>
                                <button type="button" onClick={toggleForm}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <div onClick={toggleForm}>
                            <InputFeild name={""} type={"password"} label={"Mật khẩu hiện tại"}
                                        form={form}
                                        disable={true}

                            />
                            <InputFeild name={""} type={"password"} label={"Mật khẩu mới"}
                                        form={form}
                                        disable={true}

                            />
                            <InputFeild name={""} type={"password"} label={"Nhập lại mật khẩu"}
                                        form={form}
                                        disable={true}

                            />
                        </div>
                }
                {/* End Form */}
            </div>
            {/* End Body */}
        </>
    );
};

export default ChangePassForm;