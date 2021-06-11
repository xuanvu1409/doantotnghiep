import React, {useEffect, useState} from 'react';
import {Controller, useFieldArray, useForm} from "react-hook-form";
import useToggle from "../../../../../hooks/useToggle";
import CreatableSelect from "react-select/creatable";
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";
import {useSelector} from "react-redux";
import {changeStatusContact, updateContact} from "../../../../../api/memberApi";
import {toast} from "react-toastify";
import {getContactById} from "../../../../../api/contactApi";
import {ToggleButton} from "primereact/togglebutton";
import {sweetAlert} from "../../../../../libs/sweetAlert2";

const listContact = [
    {label: "Số điện thoại", value: "Số điện thoại", icon: "tio-iphone"},
    {label: "Facebook", value: "Facebook", icon: "tio-facebook"},
    {label: "Instagram", value: "Instagram", icon: "tio-instagram"},
    {label: "Github", value: "Github", icon: "tio-github"},
    {label: "YouTube", value: "YouTube", icon: "tio-youtube"},
    {label: "Website", value: "Website", icon: "tio-globe"},
]


const ContactForm = () => {
    const {currentMember} = useSelector(state => state.member);
    const {register, setValue, control, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            contact: [{name: {label: "Website", value: "Website"}, value: ''}]
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "contact"
    });
    const [isFormVisible, setIsFormVisible] = useToggle();
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState([]);

    useEffect(() => {
        getContact()
    }, [])

    const changeStatus = (e) => {
        const _id = e.target.id;

        sweetAlert.warning(
            e.value === true ? "Ẩn liên hệ" : "Hiện liên hệ",
            e.value === true ? "Bạn muốn ẩn liên hệ này?" : "Bạn muốn hiện liên hệ này?",
            async () => {
                await changeStatusContact(_id, {isHide: e.value}).then(res => {
                    toast.success(res.data.message);
                    getContact();
                })
            }
        )
    }

    const getContact = async () => {
        await getContactById(currentMember._id).then(res => {
            setContact(res.data);
            const arrContact = [];
            res.data.map(e => (
                arrContact.push({name: {label: e.name, value: e.name}, value: e.value})
            ))
            setValue('contact', arrContact);
        }).catch(e => {
            console.log(e)
        })
    }

    const onSubmit = (data) => {
        setLoading(true);
        let formData = data.contact.map(e => ({name: e.name.value, value: e.value, memberId: currentMember._id}))
        updateContact(formData).then(res => {
            toast.success(res.data.message);
            getContact();
            setIsFormVisible(false);
            setLoading(false);
        }).catch(e => {
            toast.error(e.response.data.message);
        })
    }

    return (
        <>
            <div className="card-header">
                <h4 className="card-title">Liên hệ</h4>

                <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" onClick={setIsFormVisible}>
                    <i className="tio-edit"/>
                </button>
            </div>
            {/* Body */}
            <div className="card-body">
                {
                    isFormVisible
                        ?
                        <div className="list-group list-group-lg list-group-flush list-group-no-gutters">
                            {/* List Item */}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    {fields.map((item, index) => (
                                        <div className={"row"} style={{marginBottom: '1rem'}} key={item.id}>
                                            <div className="col-sm-7">
                                                <input className={`form-control ${errors.contact?.[index]?.value && "is-invalid"}`}
                                                       type={'text'}
                                                       {...register(`contact.${index}.value`, {
                                                           required: {value:true, message: "Vui lòng nhập trường này"}
                                                       })}
                                                       defaultValue={item.value || ''}
                                                       placeholder={'Nhập liên kết liên hệ'}/>
                                                {errors.contact?.[index]?.value && <div className="invalid-feedback">{errors.contact?.[index]?.value.message}</div>}
                                            </div>
                                            <div className="col-sm-4 input-group-add-field"
                                                 style={{marginTop: 0, lineHeight: '36px'}}>
                                                <Controller
                                                    name={`contact.${index}.name`}
                                                    defaultValue={item.name || {label: "Website", value: "Website"}}
                                                    render={({field}) => (
                                                        <CreatableSelect
                                                            {...field}
                                                            isSearchable={false}
                                                            options={listContact}
                                                        />
                                                    )}
                                                    control={control}
                                                />
                                                {
                                                    fields.length > 1
                                                    &&
                                                    <span className="input-group-add-field-delete" style={{top: '0.1rem', opacity: 1}}
                                                          onClick={() => remove(index)}>
                                                    <i className="tio-clear"/>
                                                </span>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                    <span
                                        className="js-create-field btn btn-sm btn-no-focus btn-ghost-primary"
                                        onClick={() => append({value: '', name: {label: "Website", value: "Website"} })}>
                                        <i className="tio-add"/> Add address
                                    </span>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <ButtonSubmit loading={loading} className={'mr-2'}/>
                                    <button type={'button'} className={'btn btn-white'} onClick={setIsFormVisible}>Đóng
                                    </button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="list-group list-group-lg list-group-flush list-group-no-gutters">
                            {
                                contact.map((e, index) => (
                                    <div className="list-group-item" key={index}>
                                        <div className="media">
                                            {listContact.map((x, index) => (
                                                x.label === e.name
                                                    ?
                                                    <i key={index} className={x.icon + " list-group-icon mt-1"}/>
                                                    :

                                                    null
                                            ))}
                                            <div className="media-body">
                                                <div className="row align-items-center">
                                                    <div className="col-sm mb-2 mb-sm-0">
                                                        <h5 className="mb-0">{e.name}</h5>
                                                        <a className="font-size-sm" href={e.value}>{e.value}</a>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <ToggleButton checked={e.isHide} id={e._id} onChange={changeStatus} style={{fontSize: '.8125rem', padding: '.4375rem .65625rem'}} onLabel="Hiện" offLabel="Ẩn" onIcon="pi pi-eye" offIcon="pi pi-eye-slash" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
            {/* End Body */}
        </>
    );
};

export default ContactForm;