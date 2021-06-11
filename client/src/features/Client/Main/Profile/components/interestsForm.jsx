import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";
import {getInterests} from "../../../../../api/interestsApi";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {updateInterests} from "../../../../../api/memberApi";
import useToggle from '../../../../../hooks/useToggle';
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";

const animatedComponents = makeAnimated();
const InterestsForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useToggle();
    const [interests, setInterests] = useState([]);
    const [valueForm, setValueForm] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFormVisible) {
            getInterests().then(res => {
                setInterests(res.data.map(e => ({label: e.name, value: e._id})));
            })
        }
    }, [isFormVisible === true])

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            interests: valueForm
        }
        setLoading(true);
        updateInterests(formData).then(res => {
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
                <h2 className="card-header-title h5">Sở thích</h2>

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
                                <ButtonSubmit className={'mr-2'} loading={loading}/>
                                <button type="button" onClick={setIsFormVisible}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-box text-dark mb-3 cursor-pointer" onClick={setIsFormVisible}>
                            {
                                currentMember.interestsId
                                &&
                                currentMember.interestsId.map((e, i) => (<li className={"list-item-box"} key={i}>{e.name}</li>))
                            }
                            {
                                currentMember.interestsId.length === 0
                                &&
                                    <li>Hãy cho mọi người biết sở thích của bạn</li>
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default InterestsForm;