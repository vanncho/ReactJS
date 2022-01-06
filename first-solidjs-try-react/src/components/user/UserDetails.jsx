import React from 'react';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const user = useSelector((store) => store.user);
  const {
    address, company, email, name, phone, username, website,
  } = user;

  console.log('<UserDetails />');

  return (
    <div className="row-content">
      <div className="row">
        <p className="inline">name: </p>
        <p className="inline user-text">{name}</p>
      </div>
      <div className="row">
        <p className="inline">username: </p>
        <p className="inline user-text">{username}</p>
      </div>
      <div className="row">
        <p className="inline">address: </p>
        <p className="user-text">{`${address.street}, ${address.city}`}</p>
      </div>
      <div className="row">
        <p className="inline">phone: </p>
        <p className="inline user-text">{phone}</p>
      </div>
      <div className="row">
        <p className="inline">e-mail: </p>
        <p className="inline user-text">{email}</p>
      </div>
      <div className="row">
        <p className="inline">web site: </p>
        <p className="inline user-text">{website}</p>
      </div>
      <div className="row">
        <p className="inline">company: </p>
        <p className="inline user-text">{company.name}</p>
      </div>
    </div>
  );
};

export default UserDetails;
