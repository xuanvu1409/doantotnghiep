import React from 'react';
import {Carousel} from "react-bootstrap";

const Image = ({images, avatar}) => {
    return (
        <div className="col-lg-6 col-sm-12">
            <div className="photo-album">
                <Carousel interval={999999999}>
                    {
                        images.length !== 0
                            ?
                            images.map(e => (
                                <Carousel.Item key={e.srcImage.toString()}>
                                    <img
                                        className="d-block w-100"
                                        src={e.srcImage}
                                        alt={e.srcImage}
                                    />
                                </Carousel.Item>
                            ))
                            :
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={avatar?.srcImage}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                    }
                </Carousel>
            </div>
        </div>
    );
};

export default Image;