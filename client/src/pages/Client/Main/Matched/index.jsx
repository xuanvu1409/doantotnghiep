import React, {useState} from 'react';
import {Nav, Tab} from "react-bootstrap";
import Matched from "./components/matched";
import MatchedRequest from "./components/matchedRequest";

const Index = () => {
    const [reload, setReload] = useState(false)

    return (
        <div className={'content container-fluid'}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={'info'}>
                <div className="hs-nav-scroller-horizontal mb-5">
                    <Nav variant="pills" className="flex-column">
                        <ul className="nav nav-tabs align-items-center justify-content-center">
                            <li className="nav-item">
                                <Nav.Link eventKey="info">Đã kết đôi</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link eventKey="gallery">Lời mời kết đôi</Nav.Link>
                            </li>
                        </ul>
                    </Nav>
                </div>
                {/* End Nav */}
                <Tab.Content>
                    <Tab.Pane eventKey="info">
                        <Matched reload={reload}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="gallery">
                        <MatchedRequest reload={() => setReload(true)}/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default Index;
