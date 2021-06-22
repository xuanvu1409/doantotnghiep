import React, {useEffect, useState} from 'react';
import {getGender} from "../../api/genderApi";
import {Button, Modal} from "react-bootstrap";
import CustomModal from "./customModal";

const Gender = ({form, inputClass, value}) => {
    const {register, setValue, formState: {errors}} = form;
    const [listGender, setListGender] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const gender = async () => {
        setModalShow(true);
        const {data} = await getGender();
        setListGender(data);
    }

    useEffect(() => {
        if (value) {
            setValue("genderId", String(value._id));
        }
    }, [])

    const setGender = async (e) => {
        setValue("genderId", e.target.value);
    }

    return (
        <>
            <div className="input-group input-group-md-down-break">
                {/* Custom Radio */}
                <div className={inputClass || "form-control"}>
                    <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input"
                               value={1}
                               {...register("genderId", {
                                   required: true
                               })}
                               id="genderTypeRadioEg1"/>
                        <label className="custom-control-label"
                               htmlFor="genderTypeRadioEg1"><i
    className="tio-face-male"/> Nam</label>
                    </div>
                </div>
                {/* End Custom Radio */}
                {/* Custom Radio */}
                <div className={inputClass || "form-control"}>
                    <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input"
                               value={2}
                               {...register("genderId", {
                                   required: true
                               })}
                               id="genderTypeRadioEg2"
                        />
                        <label className="custom-control-label"
                               htmlFor="genderTypeRadioEg2"><i
    className="tio-face-female"/> Nữ</label>
                    </div>
                </div>
                {/* End Custom Radio */}
                {/* Custom Radio */}
                <div className={inputClass || "form-control"}>
                    <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input"
                               value={3}
                               {...register("genderId", {
                                   required: true
                               })} id="genderTypeRadioEg3"/>
                        <label className="custom-control-label" htmlFor="genderTypeRadioEg3"
                            // data-toggle="modal"
                            // data-target=".bd-example-modal-sm"
                               onClick={gender}>Khác</label>
                    </div>
                </div>
                {/* End Custom Radio */}
                {errors.genderId &&
                <div className="invalid-feedback">Vui lòng chọn giới tính</div>}
            </div>


            <CustomModal show={modalShow} onHide={() => setModalShow(false)} size={'sm'}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h5 className="modal-title h4 text-center" id="mySmallModalLabel">Chọn giới tính của
                            bạn</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group input-group-down-break card-body-height">
                        {
                            listGender.map((e, i) => (
                                <div className="form-control form-control-lg" key={i}>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input"
                                               value={e._id}
                                               onChange={e => setGender(e)}
                                               {...register("genderId")}
                                               id={"genderTypeRadioVerEg" + i}
                                        />
                                        <label className="custom-control-label"
                                               htmlFor={"genderTypeRadioVerEg" + i}>{e.name}</label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Button className={'float-right'} onClick={() => setModalShow(false)}>Đóng</Button>
                </Modal.Body>
            </CustomModal>
        </>
    );
};

export default Gender;