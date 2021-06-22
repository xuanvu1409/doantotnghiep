import React from 'react';
import {Link} from "react-router-dom";
import {titleCase} from "../../../../../utils/helper";
import moment from "moment";

const Info = (props) => {
    const {member} = props;
    const {workAndEducation, personalInfo} = member;

    return (
        <div className="col-lg-6 d-sm-none d-lg-block">
            <div className="card-body card-body-height">
                <h1 className="page-header-title">
                    <Link to="/encounters">
                        {member.name && titleCase(member.name)}, {moment().diff(member.dateOfBirth, 'years', false)} {member?.isConfirm &&
                    <i className="tio-checkmark-circle"/>}
                    </Link>
                </h1>
                <div className="profile-detail mt-3">
                    <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                        {
                            workAndEducation
                            &&
                            <>
                                {
                                    workAndEducation?.jobTitle
                                &&
                                    <li>
                                        {workAndEducation?.jobTitle}
                                    </li>
                                }
                                {
                                    workAndEducation?.company
                                    &&
                                    <li>
                                        {workAndEducation?.company}
                                    </li>
                                }
                                {
                                    workAndEducation?.education
                                    &&
                                    <li>
                                        {workAndEducation?.education}
                                    </li>
                                }
                            </>
                        }
                        {
                            personalInfo?.length > 0 && personalInfo[0]?.value !== ''
                            &&
                            <>
                                <li className="py-0">
                                    <small className="card-subtitle">Về tôi</small>
                                </li>
                                <li>
                                    {personalInfo[0].value}
                                </li>
                            </>
                        }
                        {
                            personalInfo?.length > 0
                            &&
                            <>
                                <li className="py-0">
                                    <small className="card-subtitle">Thông tin cơ bản</small>
                                </li>
                                {personalInfo.map(e => (
                                    e.name !== "aboutMe"
                                    &&
                                    e.value.value !== ''
                                    &&
                                    <li key={e.name.toString()}>
                                        {e.label + ': ' + e.value.value}
                                    </li>
                                ))}
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Info;