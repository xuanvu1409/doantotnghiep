import React from 'react';
import {Nav, Tab} from "react-bootstrap";
import FavoritedYou from "./components/favoritedYou";
import YourFavorites from "./components/yourFavorites";

const Index = () => {
    return (
        <div className={'content container-fluid'}>
            <Tab.Container id="left-tabs-example" defaultActiveKey={'info'}>
                <div className="hs-nav-scroller-horizontal mb-5">
                    <Nav variant="pills" className="flex-column">
                        <ul className="nav nav-tabs align-items-center justify-content-center">
                            <li className="nav-item">
                                <Nav.Link eventKey="info">Người yêu thích bạn</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link eventKey="gallery">Người bạn yêu thích</Nav.Link>
                            </li>
                        </ul>
                    </Nav>
                </div>
                {/* End Nav */}
                <Tab.Content>
                    <Tab.Pane eventKey="info">
                        <FavoritedYou/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="gallery">
                        <YourFavorites/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};

export default Index;
