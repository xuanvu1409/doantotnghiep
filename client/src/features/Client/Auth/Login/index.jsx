import React, {useEffect} from 'react';
import {togglePassword} from "../../../../utils/helper";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import "./login.css";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "./loginAction";
import {Spinner} from "react-bootstrap";
import ButtonSubmit from "../../../../components/Share/buttonSubmit";

const Index = () => {
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.login);
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm();

    useEffect(() => {
        document.getElementById("root").style.width = "100%";
        document.body.className = "d-flex align-items-center min-h-100";
    }, [])

    useEffect(() => {
        if (loginState.status === 401) {
            setError("email", {message: loginState.message})
        } else if (loginState.status === 400) {
            setError("password", {message: loginState.message})
        }
    }, [loginState])

    const onSubmit = async (data) => {
        await dispatch(loginAction(data));
    }

    return (
        <div className="login-page">
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
                                        <h1 className="display-4">Đăng nhập</h1>
                                        <p>Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản tại đây</Link></p>
                                    </div>
                                    <div className="mb-4">
                                        <a className="btn btn-lg btn-white btn-block" href="#">
                                          <span className="d-flex justify-content-center align-items-center">
                                            <img className="avatar avatar-xss mr-2" src="assets\svg\brands\google.svg"
                                                 alt="Image Description"/>
                                            Sign up with Google
                                          </span>
                                        </a>
                                    </div>
                                    <div className="text-center mb-4">
                                        <span className="divider text-muted">Hoặc</span>
                                    </div>
                                    {/* Form Group */}
                                    <div className="js-form-message form-group">
                                        <label className="input-label" htmlFor="signupSrEmail">Email</label>
                                        <input type="email"
                                               className={`form-control form-control-lg ${errors.email && "is-invalid"}`}
                                               {...register("email", {
                                                   required: {
                                                       value: true,
                                                       message: "Vui lòng điền email của bạn"
                                                   }
                                               })}
                                               placeholder="Nhập email của bạn"
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                    </div>
                                    {/* End Form Group */}
                                    {/* Form Group */}
                                    <div className="js-form-message form-group">
                                        <label className="input-label" htmlFor="signupSrPassword" tabIndex={0}>
                                              <span className="d-flex justify-content-between align-items-center">
                                                Mật khẩu
                                                <a className="input-label-secondary"
                                                   href="authentication-reset-password-cover.html">Quên mật khẩu?</a>
                                              </span>
                                        </label>
                                        <div className="input-group input-group-merge">
                                            <input type="password"
                                                   className={`js-toggle-password form-control form-control-lg ${errors.password && "is-invalid"}`}
                                                   {...register("password", {
                                                       required: {
                                                           value: true,
                                                           message: "Vui lòng điền mật khẩu của bạn"
                                                       }
                                                   })}
                                                   placeholder="Nhập mật khẩu của bạn"
                                            />
                                            <div id="changePassTarget" className="input-group-append">
                                                <a className="input-group-text" href="javascript:;"
                                                   onClick={togglePassword}>
                                                    <i id="changePassIcon" className="tio-hidden-outlined"/>
                                                </a>
                                            </div>
                                        </div>
                                        {errors.password &&
                                        <div className="invalid-feedback">{errors.password.message}</div>}
                                    </div>
                                    {/* End Form Group */}
                                    {/* Checkbox */}
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" defaultChecked={true}
                                                   className="custom-control-input" id="termsCheckbox"
                                                   name="termsCheckbox"/>
                                            <label className="custom-control-label text-muted"
                                                   htmlFor="termsCheckbox"> Nhớ tôi</label>
                                        </div>
                                    </div>
                                    {/* End Checkbox */}
                                    <ButtonSubmit className={'btn-lg btn-block'} loading={isSubmitting} buttonText={'Đăng nhập'} />
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
