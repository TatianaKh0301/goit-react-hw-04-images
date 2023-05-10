import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');
export default function Modal({onClose, children}) { 

    const handleKeyDown = event => {        
        if (event.code === "Escape") {
            onClose();
        }
        return;
    };

    const handleBackdropClick = event => {
        console.log("event.currentTarget", event.currentTarget);
        console.log("event.target", event.target);
        if (event.currentTarget === event.target) {
            onClose();
        }       
    }
    
    useEffect(() => 
        {window.addEventListener('keydown', handleKeyDown);
        return () => {window.removeEventListener('keydown', handleKeyDown);}
        });

    return createPortal(
        <Overlay onClick={handleBackdropClick}>
            <ModalWindow>
                {children}
            </ModalWindow>
        </Overlay>,
        modalRoot,
    );  
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

