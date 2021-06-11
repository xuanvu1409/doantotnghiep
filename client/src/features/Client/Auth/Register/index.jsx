import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./register.css";
import {togglePassword} from "../../../../utils/helper";
import {useForm, Controller} from "react-hook-form";
import Select from 'react-select';
import {getLocation} from "../../../../api/locationApi";
import {registerAction} from "./registerAction";
import {useDispatch, useSelector} from "react-redux";
import {Button, Spinner} from "react-bootstrap";
import DateOfBirth from "../../../../components/Share/dateOfBirth";
import Gender from "../../../../components/Share/gender";
import moment from "moment";

const Index = () => {
    const registerState = useSelector(state => state.register);
    const dispatch = useDispatch();
    const [listLocation, setListLocation] = useState([]);
    const form = useForm();
    const {register, setError, handleSubmit, control, formState: {errors, isSubmitting}} = form;

    useEffect(() => {
        document.getElementById("root").style.width = "100%";
        document.body.className = "d-flex align-items-center min-h-100";

        const location = async () => {
            const {data} = await getLocation();
            let newList = await data.map(item => {
                return {value: item._id, label: item.name}
            });
            setListLocation(newList);
        }
        location();
    }, [])

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            locationId: data.location.value,
            dateOfBirth: moment(data.year.value + '-' + data.month.value + '-' + data.day.value).format()
        }
        await dispatch(registerAction(formData));
    }

    useEffect(() => {
        if (registerState.status === "error") {
            setError("email", {message: registerState.message});
        }
        if (registerState.status === "success") {
            window.location.replace('/');
        }
    }, [registerState])

    return (
        <div className="register-page">
            {/* ========== HEADER ========== */}
            <header className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
                <div className="d-flex d-lg-none justify-content-between">
                    <a href="index.html">
                        <img className="w-100" src="assets\svg\logos\logo.svg" alt="Image Description"
                             style={{minWidth: '7rem', maxWidth: '7rem'}}/>
                    </a>
                    {/* Select */}
                    {/* End Select */}
                </div>
            </header>
            {/* ========== END HEADER ========== */}
            {/* ========== MAIN CONTENT ========== */}
            <main id="content" role="main" className="main pt-0">
                {/* Content */}
                <div className="container-fluid px-3">
                    <div className="row">
                        {/* Cover */}
                        <div
                            className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light px-0">
                            {/* Logo & Language */}
                            <div className="position-absolute top-0 left-0 right-0 mt-3 mx-3">
                                <div className="d-none d-lg-flex justify-content-between">
                                    <a href="index.html">
                                        <img className="w-100" src="assets\svg\logos\logo.svg" alt="Image Description"
                                             style={{minWidth: '7rem', maxWidth: '7rem'}}/>
                                    </a>
                                    {/* Select */}
                                    {/* End Select */}
                                </div>
                            </div>
                            {/* End Logo & Language */}
                            <div style={{maxWidth: '23rem'}}>
                                <div className="text-center mb-5">
                                    <img className="img-fluid" src="assets\svg\illustrations\chat.svg"
                                         alt="Image Description" style={{width: '12rem'}}/>
                                </div>
                                <div className="mb-5">
                                    <h2 className="display-4">Build digital products with:</h2>
                                </div>
                                {/* List Checked */}
                                <ul className="list-checked list-checked-lg list-checked-primary list-unstyled-py-4">
                                    <li className="list-checked-item">
                                        <span className="d-block font-weight-bold mb-1">All-in-one tool</span>
                                        Build, run, and scale your apps - end to end
                                    </li>
                                    <li className="list-checked-item">
                                        <span className="d-block font-weight-bold mb-1">Easily add &amp; manage your services</span>
                                        It brings together your tasks, projects, timelines, files and more
                                    </li>
                                </ul>
                                {/* End List Checked */}
                                <div className="row justify-content-between mt-5 gx-2">
                                    <div className="col">
                                        <img className="img-fluid" src="assets\svg\brands\gitlab-gray.svg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid" src="assets\svg\brands\fitbit-gray.svg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid" src="assets\svg\brands\flow-xo-gray.svg"
                                             alt="Image Description"/>
                                    </div>
                                    <div className="col">
                                        <img className="img-fluid" src="assets\svg\brands\layar-gray.svg"
                                             alt="Image Description"/>
                                    </div>
                                </div>
                                {/* End Row */}
                            </div>
                        </div>
                        {/* End Cover */}
                        <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
                            <div className="w-100 pt-10 pt-lg-7 pb-7" style={{maxWidth: '25rem'}}>
                                {/* Form */}
                                <form className="js-validate" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="text-center mb-5">
                                        <h1 className="display-4">Tạo tài khoản</h1>
                                        <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></p>
                                    </div>
                                    {/* Form Group */}
                                    <div className="form-group">
                                        <label className="input-label" htmlFor="signupSrEmail">Tên</label>
                                        <input type="text"
                                               className={`form-control form-control-lg ${errors.name && "is-invalid"}`} {...register("name", {
                                            required: {
                                                value: true,
                                                message: "Vui lòng điền tên của bạn"
                                            },
                                            minLength: {value: 2, message: "Vui lòng điền mật khẩu trên 2 ký tự"},
                                            maxLength: {value: 50, message: "Vui lòng không điền quá 50 ký tự"}
                                        })}
                                               placeholder="Tên của bạn"/>
                                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                    </div>
                                    {/* End Form Group */}
                                    <label className="input-label" htmlFor="fullNameSrEmail">Sinh nhật</label>
                                    {/* Form Group */}
                                    <DateOfBirth form={form} />
                                    {/* End Form Group */}
                                    {/* Form Group */}
                                    <div className="form-group">
                                        <label className="input-label" htmlFor="signupSrEmail">Tỉnh, thành phố</label>
                                        <Controller
                                            name="location"
                                            rules={{required: {value: true, message: "Vui lòng chọn vị trí của bạn"}}}
                                            render={({field}) => (
                                                <Select
                                                    placeholder={<div>Chọn vị trí của bạn</div>}
                                                    {...field}
                                                    options={listLocation}
                                                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                                />
                                            )}
                                            control={control}
                                            defaultValue=""
                                        />
                                        {errors.location &&
                                        <div className="invalid-feedback">{errors.location.message}</div>}
                                    </div>
                                    {/* End Form Group */}
                                    <div className="form-group">
                                        <label className="input-label" htmlFor="signupSrPassword">Giới tính</label>
                                        {/* InputFeild Group */}
                                        <Gender form={form} inputClass={'form-control form-control-lg'}/>
                                        {/* End InputFeild Group */}
                                    </div>

                                    {/* Form Group */}
                                    <div className="form-group">
                                        <label className="input-label" htmlFor="signupSrPassword">Email</label>
                                        <div className="input-group input-group-merge">
                                            <input type="text" {...register("email", {
                                                required: {value: true, message: "Vui lòng điền email của bạn"},
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Vui lòng nhập đúng định dạng email"
                                                }
                                            })}
                                                   className={`form-control form-control-lg ${errors.email && "is-invalid"}`}
                                                   placeholder="Nhập email của bạn"
                                            />
                                            {errors.email &&
                                            <div className="invalid-feedback">{errors.email.message}</div>}
                                        </div>
                                    </div>
                                    {/* Form Group */}
                                    <div className="form-group">
                                        <label className="input-label"
                                               htmlFor="signupSrConfirmPassword">Mật khẩu</label>
                                        <div className="input-group input-group-merge">
                                            <input type="password"
                                                   className={`js-toggle-password form-control form-control-lg ${errors.name && "is-invalid"}`}
                                                   name="password"
                                                   placeholder="Nhập mật khẩu trên 8 ký tự"
                                                   {...register("password", {
                                                       required: {value: true, message: "Vui lòng nhập mật khẩu"},
                                                       minLength: {
                                                           value: 8,
                                                           message: "Vui lòng điền mật khẩu trên 8 ký tự"
                                                       },
                                                       maxLength: {
                                                           value: 30,
                                                           message: "Vui lòng không điền quá 30 ký tự"
                                                       }
                                                   })}
                                            />
                                            <div className="js-toggle-password-target-2 input-group-append">
                                                <a className="input-group-text" href="javascript:;"
                                                   onClick={togglePassword}>
                                                    <i id="changePassIcon" className="tio-hidden-outlined"/>
                                                </a>
                                            </div>
                                            {errors.password &&
                                            <div className="invalid-feedback">{errors.password.message}</div>}
                                        </div>
                                    </div>
                                    {/* End Form Group */}
                                    {
                                        isSubmitting
                                            ?
                                            <button className="btn btn-lg btn-block btn-primary mb-2" type="button" disabled>
                                                <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                &nbsp;Xin chờ...
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-lg btn-block btn-primary mb-2">Tạo
                                                tài
                                                khoản
                                            </button>
                                    }
                                </form>
                                {/* End Form */}
                            </div>
                        </div>
                    </div>
                    {/* End Row */}
                </div>
                {/* End Content */}
            </main>
            {/* ========== END MAIN CONTENT ========== */}

        </div>

    );
};

export default Index;
