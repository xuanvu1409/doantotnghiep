import React, {useEffect, useState} from 'react';
import Select from "./select";
import Input from "./Input";
import Textarea from "./textarea";
import {useForm} from "react-hook-form";
import ButtonSubmit from "./buttonSubmit";

const RenderForm = ({template, loading, onSubmit, data, setIsFormVisible}) => {
    const form = useForm();
    const {handleSubmit, setValue} = form;
    const {title, fields} = template;

    useEffect(() => {
        if (data.length > 0) {
            data.map(e => (
                setValue(e.name, e.value)
            ))
        }
    }, [])

    const rederForm = (fields) => {
        return fields.map((field, index) => {
            switch (field.type) {
                case "select":
                    return (
                        <span key={index}>
                            <Select
                                form={form}
                                placeholder={field.placeholder}
                                options={field.options}
                                name={field.name}
                                label={field.label}
                                validation={field.validation}
                            />
                        </span>
                    )
                case "text":
                    return (
                        <span key={index}>
                            <Input
                                form={form}
                                name={field.name}
                                placeholder={field.placeholder}
                                label={field.label}
                                validation={field.validation}
                            />
                        </span>
                    )
                case "textarea":
                    return (
                        <span key={index}>
                            <Textarea label={field.label} name={field.name} validation={field.validation} placeholder={field.placeholder}
                                      form={form}/>
                        </span>
                    )
            }
        })
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                rederForm(fields)
            }
            <div className="float-right">
                <ButtonSubmit loading={loading} className={'mr-2'}/>
                <button onClick={setIsFormVisible} type={'button'} className={'btn btn-white'}>Đóng</button>
            </div>
        </form>
        )
};

export default RenderForm;