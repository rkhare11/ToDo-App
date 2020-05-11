import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

// Getting different kinds of props from the parent component
// makes this Modal component a HIGHLY REUSABLE COMPONENT which
// can be used as any kind of a button anywhere in the APP

export const GenericModal = ({modalHeader, modalBody, modalFooter, isOpen, toggle}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                {modalHeader}
            </ModalHeader>
            <ModalBody>
                {modalBody}
            </ModalBody>
            <ModalFooter>
                {modalFooter}
            </ModalFooter>
        </Modal>
    );
}

GenericModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    modalHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    modalBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    modalFooter: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
};
