// In-memory model
let deathCertificates = [];

const getAll = () => [...deathCertificates];
const create = (data) => {
  const cert = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' };
  deathCertificates.unshift(cert);
  return cert;
};
const findByTokenOrMobile = (tokenOrMobile) => deathCertificates.find(c => c.token === tokenOrMobile || c.mobile === tokenOrMobile);

module.exports = {
  create,
  find: getAll,
  findById: (id) => deathCertificates.find(c => c.id === id),
  findByTokenOrMobile,
  updateStatus: (id, status) => {
    const cert = module.exports.findById(id);
    if (cert) cert.status = status;
    return cert;
  }
};

