import React from 'react';

import UserDetails from '../user/UserDetails';

const Modal = (props) => {
  const { handleClose, isOpen, modalClass } = props;

  console.log('<Modal />');

  if (!isOpen) return null;

  return (
    <div className={modalClass}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">User Details</h4>
          <button onClick={handleClose} className="modal-close-btn">X</button>
        </div>
        <div className="modal-body">
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default Modal;
