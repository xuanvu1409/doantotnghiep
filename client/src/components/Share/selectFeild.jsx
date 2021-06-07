import React from 'react';
import Select from 'react-select';
const SelectFeild = ({label, defaultValue, isDisabled, isLoading, isClearable, isSearchable, name, options, className}) => {
    return (

        <div className="row form-group">
            <label htmlFor={name || ''} className="col-sm-3 col-form-label input-label">{label}</label>
            <div className="col-sm-9">
                <Select
                    className={className || 'basic-single'}
                    classNamePrefix="select"
                    defaultValue={defaultValue || {}}
                    isDisabled={isDisabled || false}
                    isLoading={isLoading || false}
                    isClearable={isClearable || false}
                    isSearchable={isSearchable || true}
                    name={name}
                    options={options || []}
                />
            </div>
        </div>

    );
};

export default SelectFeild;