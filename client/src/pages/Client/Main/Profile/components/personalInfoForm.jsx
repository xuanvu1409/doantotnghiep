import React, {useEffect, useState} from 'react';
import RenderForm from "../../../../../components/Share/renderForm";
import useToggle from "../../../../../hooks/useToggle";
import {getPersonalInfo, updatePersonalInfo} from "../../../../../api/memberApi";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {getMember} from "../../../../../components/Client/Sidebar/memberSlice";

const template = {
    id: 1,
    title: "personal info",
    fields: [
        {
            label: "Về tôi",
            type: "textarea",
            name: "aboutMe",
            value: "",
            placeholder: "Viết một chút về bản thân bạn",
            validation: {
                maxLength: {
                    value: 500,
                    message: "Vui lòng nhập tối đa 500 ký tự"
                }
            }
        },
        {
            label: "Tình trạng",
            type: "select",
            name: "relationship",
            value: "",
            options: [
                {
                    "value": "none",
                    "label": "Tôi không muốn nói"
                },
                {
                    "value": "Tôi có một quan hệ phức tạp",
                    "label": "Tôi có một quan hệ phức tạp"
                },
                {
                    "value": "Độc thân",
                    "label": "Độc thân"
                },
                {
                    "value": "Đang hẹn hò",
                    "label": "Đang hẹn hò"
                }
            ]
        },
        {
            label: "Chiều cao",
            type: "select",
            name: "height",
            placeholder: "Chọn chiều cao của bạn",
            value: "",
            options: [
                {
                    "value": "none",
                    "label": "Tôi không muốn nói"
                },
                {
                    "value": "91 cm",
                    "label": "<91 cm"
                },
                {
                    "value": "92 cm",
                    "label": "92 cm"
                },
                {
                    "value": "93 cm",
                    "label": "93 cm"
                },
                {
                    "value": "94 cm",
                    "label": "94 cm"
                },
                {
                    "value": "95 cm",
                    "label": "95 cm"
                },
                {
                    "value": "96 cm",
                    "label": "96 cm"
                },
                {
                    "value": "97 cm",
                    "label": "97 cm"
                },
                {
                    "value": "98 cm",
                    "label": "98 cm"
                },
                {
                    "value": "99 cm",
                    "label": "99 cm"
                },
                {
                    "value": "100cm",
                    "label": "100cm"
                },
                {
                    "value": "101 cm",
                    "label": "101 cm"
                },
                {
                    "value": "102 cm",
                    "label": "102 cm"
                },
                {
                    "value": "103 cm",
                    "label": "103 cm"
                },
                {
                    "value": "104 cm",
                    "label": "104 cm"
                },
                {
                    "value": "105 cm",
                    "label": "105 cm"
                },
                {
                    "value": "106 cm",
                    "label": "106 cm"
                },
                {
                    "value": "107 cm",
                    "label": "107 cm"
                },
                {
                    "value": "108 cm",
                    "label": "108 cm"
                },
                {
                    "value": "109 cm",
                    "label": "109 cm"
                },
                {
                    "value": "110 cm",
                    "label": "110 cm"
                },
                {
                    "value": "111 cm",
                    "label": "111 cm"
                },
                {
                    "value": "112 cm",
                    "label": "112 cm"
                },
                {
                    "value": "113 cm",
                    "label": "113 cm"
                },
                {
                    "value": "114 cm",
                    "label": "114 cm"
                },
                {
                    "value": "115 cm",
                    "label": "115 cm"
                },
                {
                    "value": "116 cm",
                    "label": "116 cm"
                },
                {
                    "value": "117 cm",
                    "label": "117 cm"
                },
                {
                    "value": "118 cm",
                    "label": "118 cm"
                },
                {
                    "value": "119 cm",
                    "label": "119 cm"
                },
                {
                    "value": "120 cm",
                    "label": "120 cm"
                },
                {
                    "value": "121 cm",
                    "label": "121 cm"
                },
                {
                    "value": "122 cm",
                    "label": "122 cm"
                },
                {
                    "value": "123 cm",
                    "label": "123 cm"
                },
                {
                    "value": "124 cm",
                    "label": "124 cm"
                },
                {
                    "value": "125 cm",
                    "label": "125 cm"
                },
                {
                    "value": "126 cm",
                    "label": "126 cm"
                },
                {
                    "value": "127 cm",
                    "label": "127 cm"
                },
                {
                    "value": "128 cm",
                    "label": "128 cm"
                },
                {
                    "value": "129 cm",
                    "label": "129 cm"
                },
                {
                    "value": "130 cm",
                    "label": "130 cm"
                },
                {
                    "value": "131 cm",
                    "label": "131 cm"
                },
                {
                    "value": "132 cm",
                    "label": "132 cm"
                },
                {
                    "value": "133 cm",
                    "label": "133 cm"
                },
                {
                    "value": "134 cm",
                    "label": "134 cm"
                },
                {
                    "value": "135 cm",
                    "label": "135 cm"
                },
                {
                    "value": "136 cm",
                    "label": "136 cm"
                },
                {
                    "value": "137 cm",
                    "label": "137 cm"
                },
                {
                    "value": "138 cm",
                    "label": "138 cm"
                },
                {
                    "value": "139 cm",
                    "label": "139 cm"
                },
                {
                    "value": "140 cm",
                    "label": "140 cm"
                },
                {
                    "value": "141 cm",
                    "label": "141 cm"
                },
                {
                    "value": "142 cm",
                    "label": "142 cm"
                },
                {
                    "value": "143 cm",
                    "label": "143 cm"
                },
                {
                    "value": "144 cm",
                    "label": "144 cm"
                },
                {
                    "value": "145 cm",
                    "label": "145 cm"
                },
                {
                    "value": "146 cm",
                    "label": "146 cm"
                },
                {
                    "value": "147 cm",
                    "label": "147 cm"
                },
                {
                    "value": "148 cm",
                    "label": "148 cm"
                },
                {
                    "value": "149 cm",
                    "label": "149 cm"
                },
                {
                    "value": "150 cm",
                    "label": "150 cm"
                },
                {
                    "value": "151 cm",
                    "label": "151 cm"
                },
                {
                    "value": "152 cm",
                    "label": "152 cm"
                },
                {
                    "value": "153 cm",
                    "label": "153 cm"
                },
                {
                    "value": "154 cm",
                    "label": "154 cm"
                },
                {
                    "value": "155 cm",
                    "label": "155 cm"
                },
                {
                    "value": "156 cm",
                    "label": "156 cm"
                },
                {
                    "value": "157 cm",
                    "label": "157 cm"
                },
                {
                    "value": "158 cm",
                    "label": "158 cm"
                },
                {
                    "value": "159 cm",
                    "label": "159 cm"
                },
                {
                    "value": "160 cm",
                    "label": "160 cm"
                },
                {
                    "value": "161 cm",
                    "label": "161 cm"
                },
                {
                    "value": "162 cm",
                    "label": "162 cm"
                },
                {
                    "value": "163 cm",
                    "label": "163 cm"
                },
                {
                    "value": "164 cm",
                    "label": "164 cm"
                },
                {
                    "value": "165 cm",
                    "label": "165 cm"
                },
                {
                    "value": "166 cm",
                    "label": "166 cm"
                },
                {
                    "value": "167 cm",
                    "label": "167 cm"
                },
                {
                    "value": "168 cm",
                    "label": "168 cm"
                },
                {
                    "value": "169 cm",
                    "label": "169 cm"
                },
                {
                    "value": "170 cm",
                    "label": "170 cm"
                },
                {
                    "value": "171 cm",
                    "label": "171 cm"
                },
                {
                    "value": "172 cm",
                    "label": "172 cm"
                },
                {
                    "value": "173 cm",
                    "label": "173 cm"
                },
                {
                    "value": "174 cm",
                    "label": "174 cm"
                },
                {
                    "value": "175 cm",
                    "label": "175 cm"
                },
                {
                    "value": "176 cm",
                    "label": "176 cm"
                },
                {
                    "value": "177 cm",
                    "label": "177 cm"
                },
                {
                    "value": "178 cm",
                    "label": "178 cm"
                },
                {
                    "value": "179 cm",
                    "label": "179 cm"
                },
                {
                    "value": "180 cm",
                    "label": "180 cm"
                },
                {
                    "value": "181 cm",
                    "label": "181 cm"
                },
                {
                    "value": "182 cm",
                    "label": "182 cm"
                },
                {
                    "value": "183 cm",
                    "label": "183 cm"
                },
                {
                    "value": "184 cm",
                    "label": "184 cm"
                },
                {
                    "value": "185 cm",
                    "label": "185 cm"
                },
                {
                    "value": "186 cm",
                    "label": "186 cm"
                },
                {
                    "value": "187 cm",
                    "label": "187 cm"
                },
                {
                    "value": "188 cm",
                    "label": "188 cm"
                },
                {
                    "value": "189 cm",
                    "label": "189 cm"
                },
                {
                    "value": "190 cm",
                    "label": "190 cm"
                },
                {
                    "value": "191 cm",
                    "label": "191 cm"
                },
                {
                    "value": "192 cm",
                    "label": "192 cm"
                },
                {
                    "value": "193 cm",
                    "label": "193 cm"
                },
                {
                    "value": "194 cm",
                    "label": "194 cm"
                },
                {
                    "value": "195 cm",
                    "label": "195 cm"
                },
                {
                    "value": "196 cm",
                    "label": "196 cm"
                },
                {
                    "value": "197 cm",
                    "label": "197 cm"
                },
                {
                    "value": "198 cm",
                    "label": "198 cm"
                },
                {
                    "value": "199 cm",
                    "label": "199 cm"
                },
                {
                    "value": "200 cm",
                    "label": "200 cm"
                },
                {
                    "value": "201 cm",
                    "label": "201 cm"
                },
                {
                    "value": "202 cm",
                    "label": "202 cm"
                },
                {
                    "value": "203 cm",
                    "label": "203 cm"
                },
                {
                    "value": "204 cm",
                    "label": "204 cm"
                },
                {
                    "value": "205 cm",
                    "label": "205 cm"
                },
                {
                    "value": "206 cm",
                    "label": "206 cm"
                },
                {
                    "value": "207 cm",
                    "label": "207 cm"
                },
                {
                    "value": "208 cm",
                    "label": "208 cm"
                },
                {
                    "value": "209 cm",
                    "label": "209 cm"
                },
                {
                    "value": "210 cm",
                    "label": "210 cm"
                },
                {
                    "value": "211 cm",
                    "label": "211 cm"
                },
                {
                    "value": "212 cm",
                    "label": "212 cm"
                },
                {
                    "value": "213 cm",
                    "label": "213 cm"
                },
                {
                    "value": "214 cm",
                    "label": "214 cm"
                },
                {
                    "value": "215 cm",
                    "label": "215 cm"
                },
                {
                    "value": "216 cm",
                    "label": "216 cm"
                },
                {
                    "value": "217 cm",
                    "label": "217 cm"
                },
                {
                    "value": "218 cm",
                    "label": "218 cm"
                },
                {
                    "value": "219 cm",
                    "label": "219 cm"
                },
                {
                    "value": "220 cm",
                    "label": ">220 cm"
                }
            ]
        },
        {
            label: "Trẻ con",
            type: "select",
            name: "children",
            options: [
                {label: "Tôi không muốn nói", value: "none"},
                {label: "Con đã lớn", value: "Con đã lớn"},
                {label: "Đã có", value: "Đã có"},
                {label: "Không, không bao giờ", value: "Không, không bao giờ"},
                {label: "Một ngày nào đó", value: "Một ngày nào đó"}
            ]
        },
        {
            label: "Hút thuốc",
            type: "select",
            name: "smoking",
            value: "",
            options: [
                {label: "Tôi không muốn nói", value: "none"},
                {label: "Tôi thích hút thuốc", value: "Tôi thích hút thuốc"},
                {label: "Tôi ghét hút thuốc", value: "Tôi ghét hút thuốc"},
                {label: "Tôi không thích", value: "Tôi không thích"},
                {label: "Tôi hút thuốc khi giao tiếp", value: "Tôi hút thuốc khi giao tiếp"},
                {label: "Thỉnh thoảng hút thuốc", value: "Thỉnh thoảng hút thuốc"}
            ]
        },
        {
            label: "Rượu bia",
            type: "select",
            name: "drinking",
            value: "",
            options: [
                {label: "Tôi không muốn nói", value: "none"},
                {label: "Uống rượu bia giao tiếp", value: "Uống rượu bia giao tiếp"},
                {label: "không uống rượu bia", value: "Không uống rượu bia"},
                {label: "Tôi ghét rượu bia", value: "Tôi ghét rượu bia"},
                {label: "Tôi thích rượu bia", value: "Tôi thích rượu bia"},
            ]
        },
    ]
}


const PersonalInfoForm = ({member, isMe, load}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState();
    const [isFormVisible, setIsFormVisible] = useToggle();
    const {currentMember} = useSelector(state => state.member);

    const onSubmit = (data) => {
        setLoading(true);
        let newTemplate = JSON.parse(JSON.stringify(template));
        newTemplate.fields.map(e => {
            e.value = data[e.name];
            e.validation && delete e.validation;
            delete e.options;
        })
        updatePersonalInfo(newTemplate.fields).then(res => {
            load();
            toast.success(res.data.message);
            setIsFormVisible(false);
            setLoading(false);
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="card mb-3 mb-lg-5">
            {/* Header */}
            <div className="card-header">
                <h2 className="card-header-title h5">Thông tin cá nhân</h2>
                {/* Unfold */}
                {
                    isMe
                    &&
                    <button className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                            onClick={setIsFormVisible}>
                        <i className="tio-edit"/>
                    </button>
                }
                {/* End Unfold */}
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="card-body">
                {
                    isFormVisible
                        ?
                        <RenderForm template={template} loading={loading} onSubmit={onSubmit}
                                    data={member.personalInfo || []}
                                    setIsFormVisible={() => setIsFormVisible(false)}/>
                        :
                        <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                            {
                                member.personalInfo?.length > 0 ? member.personalInfo.map((e) => (
                                        <li key={e.name}><span
                                            className={'card-subtitle'}>{e.label}:</span> {(e.value.value === 'none' || e.value === '') ?
                                            <span
                                                className={'text-danger'}>Chưa có thông tin</span> : (e.value.value || e.value)}
                                        </li>
                                    ))
                                    :
                                    (
                                        isMe
                                        ?
                                            <li>Thêm đôi lời về đặc điểm bản thân bạn</li>
                                            :
                                            <li>Chưa có thông tin</li>
                                    )
                            }

                        </ul>
                }
            </div>
            {/* End Body */}
        </div>
    );
};

export default PersonalInfoForm;