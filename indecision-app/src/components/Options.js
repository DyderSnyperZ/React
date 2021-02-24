import React from 'react';
import Option from './Option'; // car Option dans Options

const Options = (props) => {
    return (
        <div>OPTIONS :
            <button onClick={props.handleDeleteOptions} disabled={!props.options.length > 0}>Remove ALL</button>
            {props.options.length === 0 && <p>Aucune options</p>}
            { props.options.map((option) => (
                <Option
                    key={option}
                    optionText={option}
                    handleDeleteOneOption={props.handleDeleteOneOption}
                />
            ))
            }
        </div>
    )
}

export default Options;