import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selecteOption}
        contentLabel='Selected Option'
        onRequestClose={props.handleClearSelectedOption}>
        {props.selecteOption && <h3>{props.selecteOption}</h3>}
        <button onClick={props.handleClearSelectedOption}>X</button>
    </Modal>
);

export default OptionModal;