import React from 'react';
import { Modal, Button } from 'react-bootstrap';
interface PopupMessageProps {
    showModal: boolean;
    closePopup: () => void;
}

function PopupMessage({showModal,closePopup}:PopupMessageProps){
    return (
        <Modal show={showModal} onHide={closePopup}>
            <Modal.Header closeButton>
                <Modal.Title>Input Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please enter only numeric values.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closePopup}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
export default PopupMessage