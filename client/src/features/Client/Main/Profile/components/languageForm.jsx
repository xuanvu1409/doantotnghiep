import React, {useEffect, useState} from 'react';
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import Select from "react-select";
import {updateLanguage} from "../../../../../api/memberApi";
import {getLanguage} from "../../../../../api/languageApi";
import useToggle from '../../../../../hooks/useToggle';
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";

const animatedComponents = makeAnimated();
const LanguageForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useToggle();
    const [language, setLanguage] = useState([]);
    const [valueForm, setValueForm] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFormVisible) {
            getLanguage().then(res => {
                setLanguage(res.data.map(e => ({label: e.name, value: e._id})));
            })
        }
    }, [isFormVisible === true])

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            language: valueForm
        }
        setLoading(true);
        updateLanguage(formData).then(res => {
            toast.success(res.data.message);
            setIsFormVisible(false);
            dispatch(getMember(res.data._id));
            setLoading(false);
        })
    }

    const handleChange = selectedOption => {
        const newValue = selectedOption.map(e => e.value);
        setValueForm(newValue);
    };

    return (
        <div className="card mb-3 mb-lg-5">
            {/* Header */}
            <div className="card-header">
                <h2 className="card-header-title h5">Ngôn ngữ</h2>

                <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" onClick={setIsFormVisible}>
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
                                <Controller
                                    name="language"
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            menuPlacement="top"
                                            onChange={handleChange}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={currentMember.languageId && currentMember.languageId.map(e => ({label: e.name, value: e._id}))}
                                            isMulti
                                            placeholder={"Bạn nói được những ngôn ngữ nào?"}
                                            options={language}
                                        />
                                    )}
                                    control={control}
                                />
                            </div>
                            <div className="float-right">
                                <ButtonSubmit className={'mr-2'} loading={loading}/>
                                <button type="button" onClick={setIsFormVisible}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-box text-dark mb-3 cursor-pointer" onClick={setIsFormVisible}>
                            {
                                currentMember.languageId
                                &&
                                currentMember.languageId.map((e, i) => (<li className={"list-item-box"} key={i}>{e.name}</li>))
                            }
                            {
                                currentMember.languageId.length === 0
                                &&
                                <li>Hãy cho mọi người biết bạn có thể giao tiếp bằng ngôn ngữ nào</li>
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default LanguageForm;