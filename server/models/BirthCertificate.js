// In-memory model - controllers use direct arrays
// Matches controller usage: create(data), find()
let birthCertificates = [];

const getAll = () => [...birthCertificates];
const create = (data) => {
  const cert = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' };
  birthCertificates.unshift(cert);
  return cert;
};
const findByTokenOrMobile = (tokenOrMobile) => birthCertificates.find(c => c.token === tokenOrMobile || c.mobile === tokenOrMobile);

module.exports = {
  create,
  find: getAll,
  findById: (id) => birthCertificates.find(c => c.id === id),
  findByTokenOrMobile,
  updateStatus: (id, status) => {
    const cert = module.exports.findById(id);
    if (cert) cert.status = status;
    return cert;
  }
};

