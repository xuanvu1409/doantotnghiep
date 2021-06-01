import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import {getJobTitle} from "../../../../../api/jobTitleApi";
import {updateWorkAndEducation} from "../../../../../api/memberApi";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";

const WorkAndEducationForm = () => {
    const {currentMember} = useSelector(state => state.member);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [jobTitle, setJobTitle] = useState();
    const {control, register, setValue, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllJobTitle = async () => {
            await getJobTitle().then(res => {
                let jobTitle = res.data.map(e => ({label: e.name, value: e.name}))
                setJobTitle(jobTitle);
            })
        }
        getAllJobTitle();
    }, [])

    const toggleForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        } else {
            setIsFormVisible(true);
            if (currentMember.workAndEducation) {
                setValue("company", currentMember.workAndEducation.company);
                setValue("education", currentMember.workAndEducation.education);
            }
        }
    }

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            wordAndEducation: {
                company: data.company,
                education: data.education,
                jobTitle: data.jobTitle === undefined ? "" : data.jobTitle.value
            }
        }

        updateWorkAndEducation(formData).then(res => {
            dispatch(getMember(res.data._id));
            toast.success(res.data.message);
            setIsFormVisible(false);
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <div className="card mb-3 mb-lg-5">
            {/* Header */}
            <div className="card-header">
                <h2 className="card-header-title h5">Công việc & giáo dục hiện tại</h2>

                <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                        onClick={toggleForm}>
                    <i className="tio-edit"/>
                </button>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="card-body">
                {
                    isFormVisible
                        ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="chuc-vu">Chức vụ</label>
                                <Controller
                                    name="jobTitle"
                                    rules={{maxLength: {value: 150, message: "Vui lòng không nhập quá 150 ký tự"}}}
                                    render={({field}) => (
                                        <CreatableSelect
                                            isClearable
                                            {...field}
                                            options={jobTitle}
                                            placeholder={<div>Thêm chức vụ</div>}
                                            defaultInputValue={currentMember.workAndEducation && currentMember.workAndEducation.jobTitle}
                                        />
                                    )}
                                    control={control}
                                />
                                {errors.jobTitle &&
                                <div className="invalid-feedback">{errors.jobTitle.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Tên công ty</label>
                                <input type="text" {...register("company", {
                                    maxLength: {value: 100, message: "Vui lòng không nhập quá 100 ký tự"}
                                })}
                                       className={`form-control ${errors.company && "is-invalid"}`}
                                       id="company"
                                       autoComplete="off"
                                       placeholder="Tối đa 100 ký tự"
                                />
                                {errors.company &&
                                <div className="invalid-feedback">{errors.company.message}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="education">Tên trường học</label>
                                <input type="text" id="education"
                                       autoComplete="off"
                                       className={`form-control js-count-characters ${errors.education && "is-invalid"}`} {...register("education", {
                                    maxLength: {value: 150, message: "Vui lòng không nhập quá 150 ký tự"}
                                })}
                                       placeholder="Tối đa 150 ký tự"/>
                                {errors.education &&
                                <div className="invalid-feedback">{errors.education.message}</div>}
                            </div>
                            <div className="float-right">
                                <input type="submit" className="btn btn-primary mr-2" value={"Lưu"}/>
                                <button type="button" onClick={toggleForm}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                            {
                                currentMember.workAndEducation && (currentMember.workAndEducation.jobTitle || currentMember.workAndEducation.company || currentMember.workAndEducation.education)
                                    ?
                                    <>
                                        {
                                            currentMember.workAndEducation.jobTitle
                                                ?
                                                <li>
                                                    <i className="tio-home-vs-1-outlined mr-1"></i>
                                                    {currentMember.workAndEducation.jobTitle}
                                                </li>
                                                :
                                                ""
                                        }
                                        {
                                            currentMember.workAndEducation.company
                                                ?
                                                <li>
                                                    <i className="tio-briefcase-outlined nav-icon mr-1"></i>
                                                    {currentMember.workAndEducation.company}
                                                </li>
                                                :
                                                ""
                                        }
                                        {
                                            currentMember.workAndEducation.education
                                                ?

                                                <li>
                                                    <i className="tio-education-outlined mr-1"></i>
                                                    {currentMember.workAndEducation.education}
                                                </li>
                                                :
                                                ""
                                        }
                                    </>
                                    :
                                    <li>Hãy cho mọi người biết thêm về bạn bằng cách điền thông tin về công việc và học
                                        vấn</li>
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default WorkAndEducationForm;