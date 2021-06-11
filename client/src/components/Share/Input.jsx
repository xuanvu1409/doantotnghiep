import React from 'react';

const Input = ({label, name, type, validation, form, placeholder, className}) => {
    const {register, formState: {errors}} = form;
    return (
        <div className="form-group">
            <label className="input-label" htmlFor={name}>{label}</label>
            <input type={type} id={name}
                {...register(name, validation)}
                className={`form-control ${errors.company && "is-invalid"} ${className || ''}`}
                placeholder={placeholder || ''}
                autoComplete={'off'}
            />
            {errors[name] &&
            <div className="invalid-feedback">{errors[name].message}</div>}
        </div>
    );
};

export default Input;