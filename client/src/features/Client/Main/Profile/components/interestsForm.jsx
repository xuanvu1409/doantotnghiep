import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";
import {getInterests} from "../../../../../api/interestsApi";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {updateInterests} from "../../../../../api/memberApi";

const animatedComponents = makeAnimated();
const InterestsForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [interests, setInterests] = useState([]);
    const [valueForm, setValueForm] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const {control, setValue, handleSubmit} = useForm();

    const toggleForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        } else {
            setIsFormVisible(true);
            getInterests().then(res => {
                setInterests(res.data.map(e => ({label: e.name, value: e._id})));
            })
        }
    }

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            interests: valueForm
        }
        updateInterests(formData).then(res => {
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
                <h2 className="card-header-title h5">Sở thích</h2>

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
                                    name="interests"
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            onChange={handleChange}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            defaultValue={currentMember.interestsId && currentMember.interestsId.map(e => ({label: e.name, value: e._id}))}
                                            isMulti
                                            placeholder={"Chọn tối đa 5 sở thích của bạn"}
                                            options={valueForm.length >= 5 ? [] : interests}
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
                                currentMember.interestsId
                                &&
                                currentMember.interestsId.map((e, i) => (<li className={"list-item-box"} key={i}>{e.name}</li>))
                            }
                            {
                                currentMember.interestsId.length === 0
                                &&
                                    <li>Cho mọi người biết sở thích của bạn</li>
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default InterestsForm;