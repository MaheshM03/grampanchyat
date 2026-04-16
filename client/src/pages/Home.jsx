import React from 'react';
import Navbar from '../components/Sections/Navbar';
import Hero from '../components/Sections/Hero';

import Population from '../components/Sections/Population';
import Services from '../components/Sections/Services';


import Map from '../components/Sections/Map';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
    
      <Population />
     
      <Services />

     
      <Contact />
       <Map />
      <Footer />
    </>
  );
}

export default Home;

