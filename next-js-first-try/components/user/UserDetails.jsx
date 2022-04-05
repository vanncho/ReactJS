import React from 'react';
import { useSelector } from 'react-redux';

import styles from './UserDetails.module.css';

const UserDetails = () => {
  const user = useSelector((store) => store.user);
  const {
    address, company, email, name, phone, username, website,
  } = user;

  console.log('<UserDetails />');

  return (
    <div className={styles['row-content']}>
      <div className={styles.row}>
        <p className={styles.inline}>name: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{name}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>username: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{username}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>address: </p>
        <p className={styles['user-text']}>{`${address.street}, ${address.city}`}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>phone: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{phone}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>e-mail: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{email}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>web site: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{website}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.inline}>company: </p>
        <p className={[styles.inline, styles['user-text']].join(' ')}>{company.name}</p>
      </div>
    </div>
  );
};

export default UserDetails;
