import React from 'react';

const Textarea = ({name, form, validation, placeholder, className, label, rows, value}) => {
    const {register, formState: {errors}} = form;
    return (

        <div className="form-group">
            <label className="input-label"
                   htmlFor={name}>{label}</label>
            <textarea id={name}
                {...register(name, validation)}
                value={value || ''}
                className={`form-control ${errors.company && "is-invalid"} ${className || ''}`}
                placeholder={placeholder} rows={rows || 4}/>
            {errors[name] &&
            <div className="invalid-feedback">{errors[name].message}</div>}
        </div>
    );
};

export default Textarea;