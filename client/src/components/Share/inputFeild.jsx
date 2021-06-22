import React from 'react';

const InputFeild = ({label, type, name, error, placeholder, form, className, disable, value}) => {
    const { register, formState: { errors }} = form;

    return (
        <div className="row form-group">
            <label htmlFor={name || ''} className="col-sm-3 col-form-label input-label">{label}</label>
            <div className="col-sm-9">
                <input defaultValue={value || ''} type={type || "text"} id={name} className={`form-control ${errors[name] && "is-invalid"} ${className || ''}`} {...register(name, (error || null))} placeholder={placeholder || ''} disabled={disable || false} />
                {errors[name] && <div className="invalid-feedback">{errors[name].message}</div>}
            </div>
        </div>
    );
};

export default InputFeild;