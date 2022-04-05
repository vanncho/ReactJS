const API_URL = 'https://jsonplaceholder.typicode.com';
const USERS_COLLECTION = 'users';

const getUsers = async () => {
  return (await fetch(`${API_URL}/${USERS_COLLECTION}`)).json();
}

const getUserById = async (id) => {
  return (await fetch(`${API_URL}/${USERS_COLLECTION}?id=${id}`)).json();
}

export {
  getUsers,
  getUserById
};
