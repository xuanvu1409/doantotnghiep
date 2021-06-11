import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {getJobTitle} from "../../../../../api/jobTitleApi";
import {updateWorkAndEducation} from "../../../../../api/memberApi";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import useToggle from '../../../../../hooks/useToggle';
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";
import Select from "../../../../../components/Share/select";
import Input from "../../../../../components/Share/Input";

const WorkAndEducationForm = () => {
    const {currentMember} = useSelector(state => state.member);
    const [isFormVisible, setIsFormVisible] = useToggle();
    const [jobTitle, setJobTitle] = useState();
    const form = useForm();
    const {setValue, handleSubmit} = form;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFormVisible) {
            getJobTitle().then(res => {
                let jobTitle = res.data.map(e => ({label: e.name, value: e.name}))
                setJobTitle(jobTitle);
            })
        }
    }, [isFormVisible === true])

    useEffect(() => {
        setValue("jobTitle", {label: currentMember.workAndEducation.jobTitle, value: currentMember.workAndEducation.jobTitle})
        setValue("company", currentMember.workAndEducation.company);
        setValue("education", currentMember.workAndEducation.education);
    }, [])

    const onSubmit = (data) => {
        const formData = {
            wordAndEducation: {
                company: data.company,
                education: data.education,
                jobTitle: data.jobTitle === undefined ? "" : data.jobTitle.value
            }
        }
        setLoading(true);
        updateWorkAndEducation(formData).then(res => {
            dispatch(getMember());
            toast.success(res.data.message);
            setIsFormVisible(false);
            setLoading(false);
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
                        onClick={setIsFormVisible}>
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
                            <Select
                                isSearchable={true}
                                options={jobTitle}
                                isClearable={true}
                                label={"Chức vụ"}
                                validation={{maxLength: {value: 150, message: "Vui lòng không nhập quá 150 ký tự"}}}
                                form={form}
                                name={'jobTitle'}
                                defaultValue={currentMember.workAndEducation && currentMember.workAndEducation.jobTitle}/>
                            <Input
                                label={'Tên công ty'}
                                form={form}
                                name={'company'}
                                validation={{maxLength: {value: 100, message: "Vui lòng không nhập quá 100 ký tự"}}}
                                placeholder={'Tối đa 100 ký tự'}
                            />
                            <Input
                                label={'Tên trường học'}
                                form={form}
                                name={'education'}
                                validation={{maxLength: {value: 150, message: "Vui lòng không nhập quá 150 ký tự"}}}
                                placeholder={'Tối đa 150 ký tự'}
                            />
                            <div className="float-right">
                                <ButtonSubmit loading={loading} className={'mr-2'}/>
                                <button type="button" onClick={setIsFormVisible}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3 cursor-pointer"
                            onClick={setIsFormVisible}>
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