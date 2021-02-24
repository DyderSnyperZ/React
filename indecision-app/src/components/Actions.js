import React from 'react';

const Actions = (props) => {
    return (
        <div>
            <button onClick={props.handlePickOption}>Je fais quoi ?</button>
        </div>
    )
}

export default Actions;