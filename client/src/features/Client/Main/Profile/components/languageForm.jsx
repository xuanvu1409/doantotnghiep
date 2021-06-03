import React, {useState} from 'react';
import makeAnimated from "react-select/animated/dist/react-select.esm";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import Select from "react-select";
import {updateLanguage} from "../../../../../api/memberApi";
import {getLanguage} from "../../../../../api/languageApi";

const animatedComponents = makeAnimated();
const LanguageForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [language, setLanguage] = useState([]);
    const [valueForm, setValueForm] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const {control, handleSubmit} = useForm();

    const toggleForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        } else {
            setIsFormVisible(true);
            getLanguage().then(res => {
                setLanguage(res.data.map(e => ({label: e.name, value: e._id})));
            })
        }
    }

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            language: valueForm
        }
        updateLanguage(formData).then(res => {
            toast.success(res.data.message);
            setIsFormVisible(false);
            dispatch(getMember(res.data._id));
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

                <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" onClick={toggleForm}>
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
                                <input type="submit" className="btn btn-primary mr-2" value={"Lưu"}/>
                                <button type="button" onClick={toggleForm}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-box text-dark mb-3">
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