import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {deleteMember} from "../../../../../api/memberApi";
import {sweetAlert} from "../../../../../libs/sweetAlert2";
import {useDispatch} from "react-redux";
import {logout} from "../../../../../components/Client/Sidebar/memberSlice";

const DeleteForm = ({memberId}) => {
    const dispatch = useDispatch();
    const {handleSubmit, register, formState: {errors}} = useForm();
    const [checked, setChecked] = useState(false);

    const onSubmit = (data) => {
        deleteMember(data.memberId).then(res => {
            console.log(res);
            sweetAlert.autoClose('success', 'Xóa tài khoản thành công', 'Bạn sẽ đăng xuất', () => {
                dispatch(logout());
            })
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header">
                    <h4 className="card-title">Xóa tài khoản</h4>
                </div>
                {/* Body */}
                <div className="card-body">
                    <p className="card-text">Khi bạn xóa tài khoản của mình, bạn sẽ mất quyền truy cập vào các dịch vụ tài khoản Front và chúng tôi sẽ xóa vĩnh viễn dữ liệu cá nhân của bạn. Bạn có thể hủy xóa trong 14 ngày.</p>
                    <div className="form-group">
                        {/* Custom Checkbox */}
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" {...register("memberId", {required: {value: true, message: "Vui lòng đánh dấu để xác nhận"}})} onChange={() => setChecked(!checked)} defaultValue={memberId} className="custom-control-input" id="deleteAccountCheckbox" />
                            <label className="custom-control-label" htmlFor="deleteAccountCheckbox">Xác nhận rằng tôi muốn xóa tài khoản của mình.</label>
                            {errors.memberId && <div className="invalid-feedback">{errors.memberId.message}</div>}
                        </div>
                        {/* End Custom Checkbox */}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" disabled={checked === false} className="btn btn-danger">Xoá</button>
                    </div>
                </div>
            </form>
            {/* End Body */}
        </>
    );
};

export default DeleteForm;