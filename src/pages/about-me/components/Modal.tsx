import React, { useState } from "react";
import { Button } from "reactstrap";
import Modal from "react-modal";

const CertificationModal: React.FC = (): JSX.Element => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [isOpen, handleModalState] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => handleModalState(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        TEST
      </Modal>
      <Button
        size="lg"
        color="success"
        className="about__button"
        onClick={(): void => handleModalState(true)}
      >
        Show Certifications
      </Button>
    </>
  );
};

export default CertificationModal;
