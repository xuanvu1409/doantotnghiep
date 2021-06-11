import React from 'react';

const Textarea = ({name, form, validation, placeholder, className, label, rows}) => {
    const {register, formState: {errors}} = form;
    console.log(name, validation)
    return (

        <div className="form-group">
            <label className="input-label"
                   htmlFor={name}>{label}</label>
            <textarea id={name}
                {...register(name, validation)}
                className={`form-control ${errors.company && "is-invalid"} ${className || ''}`}
                placeholder={placeholder} rows={rows || 4}/>
            {errors[name] &&
            <div className="invalid-feedback">{errors[name].message}</div>}
        </div>
    );
};

export default Textarea;