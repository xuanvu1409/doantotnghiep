import React, {useEffect, useState} from 'react';
import {getLocation} from "../../../../../api/locationApi";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {updateLocation} from "../../../../../api/memberApi";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";
import {toast} from "react-toastify";
import useToggle from '../../../../../hooks/useToggle';
import ButtonSubmit from "../../../../../components/Share/buttonSubmit";
import Select from "../../../../../components/Share/select";

const LocationForm = () => {
    const dispatch = useDispatch();
    const [isFormVisible, setIsFormVisible] = useToggle();
    const [location, setLocation] = useState([]);
    const {currentMember} = useSelector(state => state.member);
    const form = useForm();
    const {handleSubmit} = form;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFormVisible) {
            getLocation().then(res => {
                let location = res.data.map(e => ({label: e.name, value: e._id}));
                setLocation(location);
            })
        }
    }, [isFormVisible === true])

    const onSubmit = (data) => {
        const formData = {
            _id: currentMember._id,
            locationId: data.location.value
        }
        setLoading(true);
        updateLocation(formData).then(res => {
            dispatch(getMember(res.data._id));
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
                <h2 className="card-header-title h5">Vị trí</h2>

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
                            <Select
                                name={'location'}
                                options={location}
                                form={form}
                                defaultValue={currentMember.locationId && {
                                    label: currentMember.locationId.name,
                                    value: currentMember.locationId._id
                                }}
                                isSearchable={false}
                            />
                            <div className="float-right">
                                <ButtonSubmit className={'m-2'} loading={loading}/>
                                <button type="button" onClick={setIsFormVisible}
                                        className="btn btn-light">Hủy
                                </button>
                            </div>
                        </form>
                        :
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3 cursor-pointer"
                            onClick={setIsFormVisible}>
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