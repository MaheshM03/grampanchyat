import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.js';
import Home from './pages/Home.jsx';

import './App.css';
import AdminCommittee from './components/Sections/AdminCommittee.jsx';
import CitizenPortal from './components/Sections/CitizenPortal.jsx';
import SmartVillage from './components/Sections/SmartVillage.jsx';
import GrievanceSection from './components/Sections/GrievanceSection.jsx';
import OtherCommittee from './components/Sections/OtherCommittee.jsx';
import RighttoInformation from './components/Sections/RighttoInformation.jsx';
import News from './components/Sections/News.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import { NewsProvider } from './context/NewsContext.js';
import { GrievanceProvider } from './context/GrievanceContext.js';
import BirthCertificate from './certificates/BirthCertificate.jsx';
import BirthCertificateForm from './certificates/BirthCertificateForm.jsx';
import DeathCertificate from './certificates/DeathCertificate.jsx';
import DeathCertificateForm from './certificates/DeathCertificateForm.jsx';
import ResidenceCertificate from './certificates/ResidenceCertificate.jsx';
import ResidenceCertificateForm from './certificates/ResidenceCertificateForm.jsx';
import AboutUs from './components/Sections/AboutUs.jsx';
import Schemes from './pages/Schemes.jsx';

function App() {
  return (
<LanguageProvider>
      <NewsProvider>
        <GrievanceProvider>
          <Router>
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-committee" element={<AdminCommittee />} />
          <Route path="/citizen-portal" element={<CitizenPortal />} />
          <Route path="/smart-village" element={<SmartVillage />} />
          <Route path="/rti" element={<RighttoInformation />} />
          <Route path="/grievance" element={<GrievanceSection />} />
          <Route path="/committee" element={<OtherCommittee />} />
          <Route path="/news" element={<News/>} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/birth" element={<BirthCertificate />} />
          <Route path="/birth-apply" element={<BirthCertificateForm />} />
          <Route path="/death" element={<DeathCertificate />} />
          <Route path="/death-apply" element={<DeathCertificateForm />} />
          <Route path="/residence" element={<ResidenceCertificate />} />
          <Route path="/residence-apply" element={<ResidenceCertificateForm />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="*" element={
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h1>404 - Page Not Found</h1>
              <a href="/">Go back to Home</a>
            </div>
          } />
        </Routes>
          </Router>
        </GrievanceProvider>
      </NewsProvider>
    </LanguageProvider>
  );
}

export default App;
