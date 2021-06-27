import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {titleCase} from "../../../../utils/helper";
import "./profile.css";
import {Nav, Tab} from "react-bootstrap";
import Info from "./components/info";
import Gallery from "./components/gallery";
import Avatar from "./components/avatar";
import {useParams, useRouteMatch} from "react-router-dom";
import {getMemberByProfileId} from "../../../../api/memberApi";

const Index = () => {
    const {profileId} = useParams();
    const [isMe, setIsMe] = useState(false);
    const [member, setMember] = useState({});
    const [contact, setContact] = useState([]);
    const [gallery, setGallery] = useState([]);
    const match = useRouteMatch();

    useEffect(() => {
        getMember();
    }, [match.params.profileId])

    const getMember = async () => {
         await getMemberByProfileId(profileId).then(res => {
            setMember(res.data.member);
            setIsMe(res.data.isMe);
            setContact(res.data.contact);
            setGallery(res.data.gallery);
        })
    }

    return (
        <div className={'content container-fluid'}>
            <div className="row justify-content-lg-center">
                <div className="col-lg-12">
                    {/* End Profile Header */}
                    {/* Nav */}
                    {/* Profile Cover */}
                    <div className="profile-cover">
                        <div className="profile-cover-img-wrapper">
                            <img id="profileCoverImg" className="profile-cover-img" src="assets\img\1920x400\img2.jpg"
                                 alt="Image Description"/>
                            {/* Custom File Cover */}
                            {/*   <div className="profile-cover-content profile-cover-btn">*/}
                            {/*       <div className="custom-file-btn">*/}
                            {/*           <input type="file" className="js-file-attach custom-file-btn-input"*/}
                            {/*                  id="profileCoverUplaoder" data-hs-file-attach-options="{*/}
                            {/*   &quot;textTarget&quot;: &quot;#profileCoverImg&quot;,*/}
                            {/*   &quot;mode&quot;: &quot;image&quot;,*/}
                            {/*   &quot;targetAttr&quot;: &quot;src&quot;,*/}
                            {/*   &quot;allowTypes&quot;: [&quot;.png&quot;, &quot;.jpeg&quot;, &quot;.jpg&quot;]*/}
                            {/*}"/>*/}
                            {/*           <label className="custom-file-btn-label btn btn-sm btn-white"*/}
                            {/*                  htmlFor="profileCoverUplaoder">*/}
                            {/*               <i className="tio-add-photo"/>*/}
                            {/*               <span className="d-none d-sm-inline-block ml-1">Update your header</span>*/}
                            {/*           </label>*/}
                            {/*       </div>*/}
                            {/*   </div>*/}
                            {/* End Custom File Cover */}
                        </div>
                    </div>
                    {/* End Profile Cover */}
                    {/* Profile Header */}
                    <div className="text-center mb-5">
                        {/* Avatar */}
                        <Avatar avatar={member.avatar} setMember={setMember} isMe={isMe}/>
                        {/* End Avatar */}
                        <h1 className="page-header-title">{member.name && titleCase(member.name)}
                            {member.isConfirm &&
                            <i className="tio-checkmark-circle ml-1" data-toggle="tooltip" data-placement="top"
                               title="Đã xác nhận"/>}</h1>
                    </div>
                    {/* End Profile Header */}
                    <Tab.Container id="left-tabs-example" defaultActiveKey={'info'}>
                        <div className="hs-nav-scroller-horizontal mb-5">
                            <Nav variant="pills" className="flex-column">
                                <ul className="nav nav-tabs align-items-center">
                                    <li className="nav-item">
                                        <Nav.Link eventKey="info">Thông tin</Nav.Link>
                                    </li>
                                    <li className="nav-item">
                                        <Nav.Link eventKey="gallery">Bộ sưu tập</Nav.Link>
                                    </li>
                                    <li className="nav-item ml-auto">
                                        {
                                            isMe
                                                ?
                                                <Link className="btn btn-sm btn-white mr-2" to={'/settings'}>
                                                    <i className="tio-settings mr-1"/> Cài đặt
                                                </Link>
                                                :
                                                <div className="custom-control custom-checkbox-switch mr-2">
                                                    <input type="checkbox" id="connectionsListCheckbox7"
                                                           className="custom-control-input custom-checkbox-switch-input"/>
                                                    <label className="custom-checkbox-switch-label btn-sm"
                                                           htmlFor="connectionsListCheckbox7">
                                                <span className="custom-checkbox-switch-default">
                                                  <i className="tio-user-add mr-1"/> Connect
                                                </span>
                                                        <span className="custom-checkbox-switch-active">
                                                  <i className="tio-done mr-1"/> Connected
                                                </span>
                                                    </label>
                                                </div>

                                        }
                                        <a className="btn btn-icon btn-sm btn-white mr-2" href="#">
                                            <i className="tio-format-points mr-1"/>
                                        </a>
                                        {/* Unfold */}
                                        <div className="hs-unfold hs-nav-scroller-unfold">
                                            <a className="js-hs-unfold-invoker btn btn-icon btn-sm btn-white"
                                               href="javascript:;">
                                                <i className="tio-more-vertical"/>
                                            </a>
                                            <div id="profileDropdown"
                                                 className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right mt-1">
                                                <span className="dropdown-header">Settings</span>
                                                <a className="dropdown-item" href="#">
                                                    <i className="tio-share dropdown-item-icon"/> Share profile
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="tio-blocked dropdown-item-icon"/> Block page and profile
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <i className="tio-info-outined dropdown-item-icon"/> Suggest edits
                                                </a>
                                                <div className="dropdown-divider"/>
                                                <span className="dropdown-header">Feedback</span>
                                                <a className="dropdown-item" href="#">
                                                    <i className="tio-report-outlined dropdown-item-icon"/> Report
                                                </a>
                                            </div>
                                        </div>
                                        {/* End Unfold */}
                                    </li>
                                </ul>
                            </Nav>
                        </div>
                        {/* End Nav */}
                        <Tab.Content>
                            <Tab.Pane eventKey="info">
                                <Info member={member} isMe={isMe} load={getMember} contact={contact}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="gallery">
                                <Gallery gallery={gallery} isMe={isMe} load={getMember}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>

    );
};

export default Index;
