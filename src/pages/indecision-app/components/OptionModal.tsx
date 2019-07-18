import React from "react";
import Modal from "react-modal";
import OptionModalProps from "../interfaces/optionModal.i";

const OptionModal: React.SFC<OptionModalProps> = ({
  selectedOption,
  clearSelectedOption,
}): JSX.Element => {
  return (
    <Modal
      isOpen={!!selectedOption}
      onRequestClose={clearSelectedOption}
      contentLabel="Selected Option"
      closeTimeoutMS={200}
      className="modal-box"
    >
      <h3 className="modal__title">Selected Option</h3>
      {selectedOption && <p className="modal__body">{selectedOption}</p>}
      <button className="button" type="button" onClick={clearSelectedOption}>
        Close
      </button>
    </Modal>
  );
};

export default OptionModal;
