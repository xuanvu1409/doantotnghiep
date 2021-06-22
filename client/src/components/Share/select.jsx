import React from 'react';
import CreatableSelect from "react-select/creatable/dist/react-select.esm";
import {Controller} from "react-hook-form";

const Select = ({label, form, placeholder, isMulti, validation, defaultValue, closeMenuOnSelect, isDisabled, isLoading, isClearable, isSearchable, name, options, className}) => {
    const {control} = form;
    return (
        <div className="form-group">
            <label htmlFor={name || ''} className="input-label">{label}</label>
            <Controller
                name={name}
                rules={validation}
                defaultValue={defaultValue || options[0]}
                render={({field}) => (
                    <CreatableSelect
                        {...field}
                        className={className || 'basic-single'}
                        classNamePrefix="select"
                        menuPlacement="top"
                        onBlurResetsInput={false}
                        closeMenuOnSelect={closeMenuOnSelect || true}
                        isLoading={isLoading || false}
                        isDisabled={isDisabled || false}
                        isClearable={isClearable || false}
                        isSearchable={isSearchable || false}
                        isMulti={isMulti || false}
                        placeholder={placeholder || ''}
                        options={options}
                    />
                )}
                control={control}
            />
        </div>

    );
};

export default Select;