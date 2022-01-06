import React from 'react';

import User from '../User';
import Modal from '../../modal/Modal';

import { useLogic } from './hooks/useLogic';

const Users = (props) => {
  const { users } = props;
  const {
    modalClass, user, onModalClose, onUserClick,
  } = useLogic();

  console.log('<Users />');

  return (
    <>
      <div className="users-container">
        { users.length > 0 && (
            users.map(user => (
              <div key={user.id} className="user-container" data-id={user.id} onClick={onUserClick}>
                <User name={user.name} />
              </div>
            ))
        )}
        { users.length > 0 && <p style={{ margin: '10px 0 0 0' }}>{`Total users: ${users.length}`}</p> }
        { users.length === 0 && <p>{'No match found.'}</p> }
      </div>
      { user && (
        <Modal
          isOpen={user && user.length === 1 !== null}
          handleClose={onModalClose}
          modalClass={modalClass}
        />
      )}
    </>
  );
};

const MemoizedUsers = React.memo(Users);
export default MemoizedUsers;
