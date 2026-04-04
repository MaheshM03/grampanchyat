// In-memory store for grievances (server restart resets)
let grievances = [];

// Helper functions
const getAllGrievances = () => [...grievances];
const createGrievance = (data) => {
  const grievance = { 
    ...data, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'pending' // new, processed, resolved
  };
  grievances.unshift(grievance); // newest first
  return grievance;
};

module.exports = {
  create: createGrievance,
  find: getAllGrievances,
  findById: (id) => grievances.find(g => g.id === id),
  // for future admin use
  updateStatus: (id, status) => {
    const index = grievances.findIndex(g => g.id === id);
    if (index > -1) {
      grievances[index].status = status;
      return grievances[index];
    }
    return null;
  }
};

