// In-memory model (matches controller contactStore array)
let contacts = [];

const create = (data) => {
  const contact = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
  contacts.unshift(contact);
  return contact;
};

module.exports = {
  create,
  find: () => [...contacts]
};

