import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {titleCase} from "../../../../utils/helper";
import "./profile.css";
import {Nav, Tab} from "react-bootstrap";
import Info from "./components/info";
import Gallery from "./components/gallery";
import Avatar from "./components/avatar";
import {getMember} from "../../../../components/Client/Sidebar/memberSlice";

const Index = () => {
    const dispatch = useDispatch();
    const {currentMember} = useSelector(state => state.member);

    useEffect(() => {
        dispatch(getMember(currentMember._id));
    }, [dispatch])

    return (
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
                    <Avatar/>
                    {/* End Avatar */}
                    <h1 className="page-header-title">{currentMember.name && titleCase(currentMember.name)}
                        {currentMember.isConfirm &&
                        <i className="tio-checkmark-circle ml-1" data-toggle="tooltip" data-placement="top"
                           title="Đã xác nhận"/>}</h1>
                </div>
                {/* End Profile Header */}
                <Tab.Container id="left-tabs-example" defaultActiveKey="info">
                    <div className="js-nav-scroller hs-nav-scroller-horizontal mb-5" data-hs-nav-scroller-options="{
                         &quot;type&quot;: &quot;horizontal&quot;,
                         &quot;delay&quot;: 20
                       }">
                        <Nav variant="pills" className="flex-column">
                            <ul className="nav nav-tabs align-items-center">
                                <li className="nav-item">
                                    <Nav.Link eventKey="info">Thông tin</Nav.Link>
                                </li>
                                <li className="nav-item">
                                    <Nav.Link eventKey="gallery">Bộ sưu tập</Nav.Link>
                                </li>
                                <li className="nav-item ml-auto">
                                    <Link className="btn btn-sm btn-white mr-2" to={'/settings'}>
                                        <i className="tio-settings mr-1"/> Cài đặt
                                    </Link>
                                    <a className="btn btn-icon btn-sm btn-white mr-2" href="#">
                                        <i className="tio-format-points mr-1"/>
                                    </a>
                                    {/* Unfold */}
                                    <div className="hs-unfold hs-nav-scroller-unfold">
                                        <a className="js-hs-unfold-invoker btn btn-icon btn-sm btn-white"
                                           href="javascript:;"
                                           data-hs-unfold-options="{
                   &quot;target&quot;: &quot;#profileDropdown&quot;,
                   &quot;type&quot;: &quot;css-animation&quot;
                 }">
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
                            <Info/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="gallery">
                            <Gallery/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>

    );
};

export default Index;
