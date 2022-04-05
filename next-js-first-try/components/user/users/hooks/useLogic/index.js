import { useEffect, useState, useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { storeSelectedUser } from '../../../../../store/actions/userAction';

import { getUserById } from '../../../../../api/userRemote';

const actionType = {
  SET_ID: 'SET_ID',
  SET_CLASS: 'SET_CLASS',
  SET_ID_CLASS: 'SET_ID_CLASS',
};

const initialState = {
  id: null,
  modalClass: 'modal-fade-in',
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_ID: return {
      ...state,
      id: action.id,
    };
    case actionType.SET_CLASS: return {
      ...state,
      modalClass: action.modalClass,
    };
    case actionType.SET_ID_CLASS: return {
      ...state,
      id: action.id,
      modalClass: action.modalClass,
    };
    default:  
      return state;
  }
};

export const useLogic = () => {
  const dispatch = useDispatch();

  const [state, reducerDispatch] = useReducer(usersReducer, initialState);
  const { id, modalClass } = state;
  // const [id, setId] = useState(null);
  // const [modalClass, setModalClass] = useState('modal-fade-in');

  const user = useSelector((store) => store.user);
  let timer;

  // const cleanUp = () => clearTimeout(timer);

  useEffect(() => {
    if (id) {
      const fetchedUserById = async (passedId) => {
        await fetchUser(passedId);
      }
      // await fetchUser(id);
      fetchedUserById(id);
    }
    
    // return () => clearTimeout(timer);
  }, [id]);

  const fetchUser = async (id) => {
    const fetchedUser = await getUserById(id);

    dispatch(storeSelectedUser(fetchedUser[0]));
  };

  const onModalClose = () => {
    // setModalClass('modal-fade-out');
    reducerDispatch({ type: actionType.SET_CLASS, modalClass: 'modal-fade-out' });

    timer = setTimeout(() => {
      dispatch(storeSelectedUser(null));
      // setId(null);
      // setModalClass('modal-fade-in');
      reducerDispatch({ type: actionType.SET_ID_CLASS, id: null, modalClass: 'modal-fade-in' });
    }, 1700);
  };

  const onUserClick = (event) => {
    const id = event.currentTarget.dataset.id;

    // setId(Number(id));
    reducerDispatch({ type: actionType.SET_ID, id });
  };

  return {
    modalClass,
    user,
    onModalClose,
    onUserClick,
  };
};
