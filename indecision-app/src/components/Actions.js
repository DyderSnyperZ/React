import React from 'react';

const Actions = (props) => (
    <div>
        <button className="big-button" disabled={!props.options.length > 0} onClick={props.handlePickOption}>Je fais quoi ?</button>
    </div>
);


export default Actions;