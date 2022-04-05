import React from 'react';

import UserDetails from '../user/UserDetails';

import styles from './Modal.module.css';

const Modal = (props) => {
  const { handleClose, isOpen, modalClass } = props;

  console.log('<Modal />');

  if (!isOpen) return null;

  return (
    <div className={styles[modalClass]}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <h4 className={styles['modal-title']}>User Details</h4>
          <button onClick={handleClose} className={styles['modal-close-btn']}>X</button>
        </div>
        <div className={styles['modal-body']}>
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default Modal;
