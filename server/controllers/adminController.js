const BirthCertificate = require('../models/BirthCertificate');
const DeathCertificate = require('../models/DeathCertificate');
const ResidenceCertificate = require('../models/ResidenceCertificate');

// @desc Get all documents from all certificate types (admin)
exports.getAllDocuments = async (req, res) => {
  try {
    const [births, deaths, residences] = await Promise.all([
      BirthCertificate.find({}).sort({ submittedAt: -1 }).lean(),
      DeathCertificate.find({}).sort({ submittedAt: -1 }).lean(),
      ResidenceCertificate.find({}).sort({ submittedAt: -1 }).lean()
    ]);

    const allCerts = [
      ...births.map(cert => ({
        type: 'Birth',
        token: cert.token,
        mobile: cert.mobile || 'N/A',
        status: cert.status,
        submittedAt: cert.submittedAt,
        documents: cert.documents || []
      })),
      ...deaths.map(cert => ({
        type: 'Death',
        token: cert.token,
        mobile: cert.informantDetails?.mobile || 'N/A',
        status: cert.status,
        submittedAt: cert.submittedAt,
        documents: cert.documents || []
      })),
      ...residences.map(cert => ({
        type: 'Residence',
        token: cert.token,
        mobile: cert.mobile || 'N/A',
        status: cert.status,
        submittedAt: cert.submittedAt,
        documents: cert.documents || []
      }))
    ];

    res.json({
      success: true,
      data: allCerts,
      count: allCerts.length
    });
  } catch (error) {
    console.error('Get all documents error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

