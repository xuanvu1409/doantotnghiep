import React, {useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import moment from "moment";

const day = () => {
    const items = [];
    for (let i = 1; i <= 31; i++) {
        items.push({label: i, value: i})
    }
    return items;
}

const month = () => {
    const items = [];
    for (let i = 1; i <= 12; i++) {
        items.push({label: i, value: i})
    }
    return items;
}

const year = () => {
    const items = [];
    const nowYear = new Date().getFullYear();
    for (let i = nowYear - 15; i >= nowYear - 80; i--) {
        items.push({label: i, value: i})
    }
    return items;
}

const DateOfBirth = ({form, value}) => {
    const {control, setValue, formState: {errors}} = form;
    useEffect(() => {
        if (value) {
            setValue("day", {label: moment(value).format('D'), value:moment(value).format('D')})
            setValue("month", {label: moment(value).format('M'), value:moment(value).format('M')})
            setValue("year", {label: moment(value).format('Y'), value:moment(value).format('Y')})
        }
    }, [])
    return (
        <>
            <div className="form-row valid-dob">
                <div className="col-sm-4">
                    <div className="form-group" style={{marginBottom: 'unset'}}>
                        <Controller
                            name="day"
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    placeholder={<div>Ngày</div>}
                                    {...field}
                                    options={day()}
                                />
                            )}
                            control={control}
                        />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <Controller
                            name="month"
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    placeholder={<div>Tháng</div>}
                                    {...field}
                                    options={month()}
                                />
                            )}
                            control={control}
                        />

                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <Controller
                            name="year"
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    placeholder={<div>Năm</div>}
                                    {...field}
                                    options={year()}
                                />
                            )}
                            control={control}
                        />

                    </div>
                </div>
                <div className="col-sm-12 invalid-dob">
                    {(errors.day || errors.month || errors.year) &&
                    <div className="invalid-feedback">Vui lòng chọn ngày sinh của bạn</div>}
                </div>
            </div>
        </>
    );
};

export default DateOfBirth;