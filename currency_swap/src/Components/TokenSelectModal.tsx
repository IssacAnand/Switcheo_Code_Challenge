import React from 'react';
import { Modal,Button } from 'react-bootstrap';
import '../form.css'

interface TokenSelectionModalProps {
    showModal: boolean;
    toggleModal: () => void;
    selectToken: (token: string) => void;
    tokens: { currency: string; price: number }[];
  }
const TokenSelectModal: React.FC<TokenSelectionModalProps> = ({ showModal, toggleModal, selectToken, tokens }) => {

    return(
     
        <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header className='token-popup' closeButton>
        <Modal.Title className='text-light'>Select Token</Modal.Title>
      </Modal.Header>
      <Modal.Body className="token-popup" >
        {tokens.map((token) => (
          <div key={token.currency} onClick={() => selectToken(token.currency)} >
            <Button className='btn mb-2 w-100 btn-dark'>
            {token.currency} - {`$`+token.price.toFixed(2)}
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>

    )

}
export default TokenSelectModal