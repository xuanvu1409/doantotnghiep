import React from 'react';

const Action = (props) => {
    const {like, skip} = props;

    return (
        <div id="actions">
            <button type={"button"} disabled={true}>
                <i className="tio-restore"/>
            </button>
            <button type={"button"} onClick={like()}>
                <i className="tio-heart"/>
            </button>
            <button type={"button"} onClick={skip()}>
                <i className="tio-clear"/>
            </button>
            <button>
                <i className="tio-star"/>
            </button>
            <button>
                <i className="tio-favorite-comment"/>
            </button>
        </div>
    );
};

export default Action;