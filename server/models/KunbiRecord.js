// In-memory model (matches controller kunbiData array)
let kunbiRecords = [];

const getAll = () => [...kunbiRecords];
const create = (data) => {
  const record = { ...data, _id: Date.now().toString(), createdAt: new Date().toISOString() };
  kunbiRecords.unshift(record);
  return record;
};

module.exports = {
  create,
  find: getAll,
  findById: (id) => kunbiRecords.find(r => r._id === id),
  deleteById: (id) => {
    const index = kunbiRecords.findIndex(r => r._id === id);
    if (index > -1) {
      kunbiRecords.splice(index, 1);
      return true;
    }
    return false;
  }
};

