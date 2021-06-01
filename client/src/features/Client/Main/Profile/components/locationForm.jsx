import React, {useEffect, useState} from 'react';
import {getLocation} from "../../../../../api/locationApi";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {updateLocation} from "../../../../../api/memberApi";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";

const LocationForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [location, setLocation] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const {control, setValue, handleSubmit} = useForm();

    useEffect(() => {
        const getAllLocation = async () => {
            await getLocation().then(res => {
                let location = res.data.map(e => ({label: e.name, value: e._id}));
                setLocation(location);
            })
        }
        getAllLocation();
    }, [])

    const toggleForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false)
        } else {
            setIsFormVisible(true);
            getLocation().then(res => {
                let location = res.data.map(e => ({label: e.name, value: e._id}));
                setLocation(location);
            })
        }
    }

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            locationId: data.location.value
        }
        updateLocation(formData).then(res => {
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
                <h2 className="card-header-title h5">Vị trí</h2>

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
                                    name="location"
                                    render={({field}) => (
                                        <Select
                                            placeholder={<div>Chọn vị trí</div>}
                                            {...field}
                                            options={location}
                                            defaultValue={currentMember.locationId && {label: currentMember.locationId.name, value: currentMember.locationId._id}}
                                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
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
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                            {
                                currentMember.locationId
                                    ?
                                    <li>
                                        <i className="tio-map mr-1"/>
                                        {currentMember.locationId.name}, Việt Nam
                                    </li>
                                    :
                                    <li>Hãy cho mọi người biết vị trí của bạn bằng cách chọn vị trí</li>
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default LocationForm;