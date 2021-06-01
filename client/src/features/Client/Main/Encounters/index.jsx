import React from 'react';
import {Link} from "react-router-dom";
import './encounters.css';
import { Carousel } from "react-bootstrap";

const Index = () => {
    return (
        <div className="encouter-page">
            <div className="card photo">
                <div className="row">
                    <div className="col-lg-6 col-sm-12">
                        <div className="photo-album">
                            <Carousel interval={999999999}>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="assets\svg\illustrations\review-5-star.svg"
                                        alt="First slide"
                                    />
                                    {/*<Carousel.Caption>*/}
                                    {/*    <h3>First slide label</h3>*/}
                                    {/*    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                                    {/*</Carousel.Caption>*/}
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="assets/img/400x400/img7.jpg"
                                        alt="Second slide"
                                    />

                                    {/*<Carousel.Caption>*/}
                                    {/*    <h3>Second slide label</h3>*/}
                                    {/*    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                                    {/*</Carousel.Caption>*/}
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-lg-6 d-sm-none d-lg-block">
                        <div className="card-body card-body-height">
                            <h1 className="page-header-title">
                                <Link to="/encounters">
                                    Vũ, 23 <i className="tio-checkmark-circle"></i>
                                </Link>
                            </h1>
                            <div className="profile-detail mt-3">
                                <ul className="list-unstyled list-unstyled-py-3 text-dark mb-3">
                                    <li className="py-0">
                                        <small className="card-subtitle">Về tôi</small>
                                    </li>

                                    <li>
                                        <i className="tio-home-vs-1-outlined mr-1"></i>
                                        Sống tại Hà nội
                                    </li>
                                    <li>
                                        <i className="tio-briefcase-outlined nav-icon mr-1"></i>
                                        Không xác định
                                    </li>
                                    <li>
                                        <i className="tio-education-outlined mr-1"></i>
                                        Đại học sư phạm kỹ thuật Hưng Yên
                                    </li>

                                    <li className="pt-2 pb-0">
                                        <small className="card-subtitle">Liên hệ</small>
                                    </li>

                                    <li>
                                        <i className="tio-online nav-icon"></i>
                                        ella@example.com
                                    </li>
                                    <li>
                                        <i className="tio-android-phone-vs nav-icon"></i>
                                        +1 (609) 972-22-22
                                    </li>

                                    <li className="pt-2 pb-0">
                                        <small className="card-subtitle">Teams</small>
                                    </li>

                                    <li>
                                        <i className="tio-group-equal nav-icon"></i>
                                        Member of 7 teams
                                    </li>
                                    <li>
                                        <i className="tio-briefcase-outlined nav-icon"></i>
                                        Working on 8 projects
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="actions">
                <button>
                    <i className="tio-restore"></i>
                </button>
                <button>
                    <i className="tio-heart"></i>
                </button>
                <button>
                    <i className="tio-clear"></i>
                </button>
                <button>
                    <i className="tio-star"></i>
                </button>
                <button>
                    <i className="tio-favorite-comment"></i>
                </button>
            </div>
        </div>
    );
};

export default Index;
