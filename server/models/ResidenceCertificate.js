// In-memory model
let residenceCertificates = [];

const getAll = () => [...residenceCertificates];
const create = (data) => {
  const cert = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'pending' };
  residenceCertificates.unshift(cert);
  return cert;
};
const findByTokenOrMobile = (tokenOrMobile) => residenceCertificates.find(c => c.token === tokenOrMobile || c.mobile === tokenOrMobile);

module.exports = {
  create,
  find: getAll,
  findById: (id) => residenceCertificates.find(c => c.id === id),
  findByTokenOrMobile,
  updateStatus: (id, status) => {
    const cert = module.exports.findById(id);
    if (cert) cert.status = status;
    return cert;
  }
};


