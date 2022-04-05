import React from 'react';

const User = (props) => {
  const { name } = props;

  console.log('<User />');

  return (
    <div>{name}</div>
  );
};

const MemoizedUser = React.memo(User);
export default MemoizedUser;
