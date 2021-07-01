import React from 'react';

const Action = (props) => {
    const {
        like,
        skip,
        liked,
        loading,
        favorite,
        favorited,
        sendCrush,
        relationship,
        cancelRelationship,
        oldData,
        back
    } = props;

    return (
        <>
            <div id="actions">
                <button type={"button"} id={'back'} onClick={back} disabled={Object.keys(oldData).length === 0}>
                    <i className="tio-restore"/>
                </button>
                <button type={"button"} id={'like'} onClick={like()} className={liked ? 'active' : ''} disabled={loading}>
                    <i className="tio-heart"/>
                </button>
                <button type={"button"} id={'skip'} onClick={skip()} disabled={loading}>
                    <i className="tio-clear"/>
                </button>
                <button type={"button"} id={'favorite'} onClick={favorite()} className={favorited ? 'active' : ''} disabled={loading}>
                    <i className="tio-star" />
                </button>
                <button type={"button"} id={'crush'} onClick={!relationship ? sendCrush : cancelRelationship()} disabled={loading} className={!relationship ? '' : 'active'}>
                    <i className="tio-favorite-comment"/>
                </button>
            </div>
        </>
    );
};

export default Action;