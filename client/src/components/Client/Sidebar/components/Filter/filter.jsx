import React, {useEffect, useState} from 'react';
import {Dropdown} from "react-bootstrap";
import {Slider} from "primereact/slider";
import Select from "../../../../Share/select";
import ButtonSubmit from "../../../../Share/buttonSubmit";
import {getLocation} from "../../../../../api/locationApi";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {filterAction} from "./filterAction";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
        className={
            'btn btn-icon btn-ghost-secondary rounded-circle'
        }
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
    </a>
));

const Filter = () => {
    const dispatch = useDispatch();
    const [valueSlider, setValueSlider] = useState([16, 80]);
    const [location, setLocation] = useState([]);
    const [dropdownShow, setDropdownShow] = useState(false);
    const form = useForm();
    const {handleSubmit, register, setValue} = form;
    const {currentMember} = useSelector(state => state.member);
    const filterState = useSelector(state => state.filter);

    useEffect(() => {
        getLocation().then(res => {
            let newLocation = res.data.map(e => ({label: e.name, value: e._id}));
            newLocation.unshift({label: "Cả nước", value: "none"})
            setLocation(newLocation);
        })
    }, []);

    useEffect(() => {
        if (filterState.status === 'success') {
            toast.success(filterState.message);
            setDropdownShow(false);
        }
    }, [filterState])

    useEffect(() => {
        if (currentMember.filter) {
            setValue("gender", currentMember.filter.gender);
            setValue("location", currentMember.filter.location);
            setValueSlider([currentMember.filter.age.min, currentMember.filter.age.max])
        }
    }, [])

    const onSubmit = async (data) => {
        let formData = {
            gender: data.gender,
            age: {min: valueSlider[0], max: valueSlider[1]},
            location: data.location
        }
        await dispatch(filterAction(formData));
    }

    return (
        <Dropdown show={dropdownShow} onToggle={(e) => setDropdownShow(e)}>
            <Dropdown.Toggle id="dropdown-filter" as={CustomToggle}
                             menuAlign={{lg: 'left'}}>
                <i className={'tio-tune'}/>
            </Dropdown.Toggle>

            <Dropdown.Menu bsPrefix={'dropdown-menu navbar-vertical-footer-dropdown'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="padding-menu">
                        <div className={'text-center text-dark font-weight-bold'}>Đặt tùy
                            chọn của bạn
                        </div>
                        <div className="text-dark mt-3 mb-1">Hiển thị</div>
                        <ul className="nav nav-segment w-100" id="connectionsTab" role="tablist">
                            <li className="nav-item w-40">
                                <label className={'nav-link justify-content-center mb-0 ' + (currentMember.filter?.gender === '1' ? 'active' : '')} id="list-tab" data-toggle="tab"
                                       role="tab" aria-controls="list"
                                       onClick={() => setValue("gender", 1)}
                                       aria-selected="false" title="List view">
                                    Nam
                                </label>
                            </li>
                            <li className="nav-item w-40">
                                <label className={'nav-link justify-content-center mb-0 ' + (currentMember.filter?.gender === '2' ? 'active' : '')} id="list-tab"
                                       onClick={() => setValue("gender", 2)}
                                       data-toggle="tab"
                                       role="tab" aria-controls="list"
                                       aria-selected="false" title="List view"
                                >
                                    Nữ
                                </label>
                            </li>
                            <li className="nav-item w-40">
                                <label className={'nav-link justify-content-center mb-0 ' + (!currentMember.filter || currentMember.filter?.gender === 'none' ? 'active' : '')} id="list-tab"
                                       data-toggle="tab"
                                       role="tab" aria-controls="list"
                                       onClick={() => setValue("gender", "none")}
                                       aria-selected="false" title="List view">
                                    Cả hai
                                </label>
                            </li>
                        </ul>
                        <input type="radio" value={'none'} checked={true} className={"d-none"} {...register('gender')}/>
                        <div className="text-dark mt-3 mb-2">Độ tuổi <span
                            className={'float-right'}>{valueSlider[0]} - {valueSlider[1]}</span>
                        </div>
                        <Slider className="slider p-ml-3" min={16} max={80} range
                                value={valueSlider}
                                onChange={(e) => setValueSlider(e.value)}
                                style={{width: '14rem', zIndex: '1'}}/>
                        <div className="text-dark mt-3 mb-1">
                            Vị trí
                        </div>
                        <Select menuPlacement={'top'} options={location} name={'location'}
                                form={form}
                                value={{label: "Cả nước", value: "none"}}/>
                        <div className="float-right">
                            <ButtonSubmit className={'mr-2'} loading={filterState.isLoading}/>
                        </div>
                    </div>
                </form>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Filter;