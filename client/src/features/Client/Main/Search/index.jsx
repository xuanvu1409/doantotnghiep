import React from 'react';
import "./search.css";

const Index = () => {
    return (
        <div className="search-page">
            <div className="row">
                <div className="col-lg-3 mb-3">
                    <a href="/">
                        <div className="card" >
                            <img className="card-img-top card-img img-profile" src="assets/svg/components/placeholder-lg.svg"
                                 alt="abc" />
                            <div className="card-img-custom">
                                <h5 className="card-title p-3"><div className="card-title">Vũ, 23 <i className="tio-checkmark-circle"></i></div></h5>
                            </div>
                            <div className="card-pinned">
                                <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle"
                                   href="javascript:;">
                                    <i className="tio-more-vertical"></i>
                                </a>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-12 mt-2">
                    <nav aria-label="...">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="/" tabIndex="-1">Previous</a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="/">1</a></li>
                            <li className="page-item">
                                <a className="page-link" href="/">2</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="/">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Index;
