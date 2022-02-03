import consts from './consts';

const createItem = async (newItem) => {
  const response = await fetch(consts.serverUrl, {
    method: 'POST',
    body: JSON.stringify(newItem),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const readItems = async () => {
  const response = await fetch(consts.serverUrl);
  return await response.json();
};

const readItem = async (id) => {
  const response = await fetch(`${consts.serverUrl}/${id}`);
  return await response.json();
};

const updateItem = async (id, updatedItem) => {
  const response = await fetch(`${consts.serverUrl}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedItem),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

const deleteItem = async (id) => {
  await fetch(`${consts.serverUrl}/${id}`, {
    method: 'DELETE',
  });
};

const api = { createItem, readItem, readItems, updateItem, deleteItem };
export default api;
