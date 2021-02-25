import React from 'react';

const Option = (props) => (
    <div>
        {props.optionText}
        <button className="button button--link" onClick={(e) => {
            props.handleDeleteOneOption(props.optionText);
        }}
        >
            X
            </button>
    </div>
);

export default Option;